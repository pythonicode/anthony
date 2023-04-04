//==============================================================================
// Scripts
//==============================================================================

importScripts("../library/epilog.js");
importScripts("../library/ground.js");

//==============================================================================
// Initialization
//==============================================================================

let tree = {};
let exploration = Math.sqrt(2) * 100; // constant in selectfn, higher number is more exploration
let nodes = 0; // keep track of total number of nodes expanded
let terminals = 0; // and total number of terminals expanded
let grounded = false;
let cancel = false;

let library;
let state;
let role;

indexing = false;
dataindexing = false;
ruleindexing = true;

//==============================================================================
// Event Handling
//==============================================================================

const eventLoopQueue = () => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    })
  );
};

const optimizer = new Worker("./optimizer.js");

onmessage = async (event) => {
  if (event.data.message == "initialize") {
    const connection = new MessageChannel();
    library = definemorerules([], event.data.rules.slice(1));
    role = event.data.role;
    state = findinits(library);
    tree = makenode(state);
    connection.port1.onmessage = ({ data }) => {
      library = data.library;
      grounded = true;
      console.log(`[Web Worker] ☑️ Rules Optimized.`);
      console.log(grindem(library));
    };
    optimizer.postMessage(
      { library: library, role: role, startclock: event.data.startclock },
      [connection.port2]
    );
    console.log(`[Web Worker] ☑️ Game Initialized! Processing.`);
    while (true) {
      await process(tree);
      await eventLoopQueue();
    }
  } else if (event.data.message == "update") {
    cancel = true;
    const action = event.data.action;
    console.log(`[Web Worker] 🌳 Updating Tree with Action: ${action}`);
    if (action != "nil") state = update(action);
    event.ports[0].postMessage({ control: tree.role });
  } else if (event.data.message == "action") {
    console.log(
      `[Web Worker] 👌 Expanded ${nodes} nodes and ${terminals} terminals.`
    );
    const [best, value, choices] = action(tree);
    console.log(
      `[Web Worker] 🎬 Choosing From The Following Actions:\n`,
      choices
    );
    console.log(
      `[Web Worker] ✅ Found best action ${best} with a value ${value}.`
    );
    event.ports[0].postMessage({ action: best });
  }
};

//==============================================================================
// Update Functions
//==============================================================================

function update(move) {
  tree = updatetree(move, tree);
  return simulate(move, state, library);
}

function updatetree(move, tree) {
  if (tree.children.length === 0) {
    let newstate = simulate(move, tree.state, library);
    return makenode(newstate, null);
  }
  for (let i = 0; i < tree.actions.length; i++) {
    if (equalp(move, tree.actions[i])) {
      let next = tree.children[i];
      delete tree;
      return next;
    }
  }
  return tree;
}

//==============================================================================
// Processing Functions
//==============================================================================

async function process(node) {
  const next = select(node);
  const children = expand(next);
  for (let i = 0; i < children.length; i++) {
    const score = depthcharge(children[i].state);
    await eventLoopQueue();
    if (cancel) {
      cancel = false;
      return;
    }
    backpropagate(children[i], score);
    await eventLoopQueue();
    if (cancel) {
      cancel = false;
      return;
    }
  }
}

function evaluate(node) {
  const intermediate = parseInt(findreward(role, node.state, library));
  if (intermediate == 100 && findterminalp(node.state, library))
    return Number.MAX_SAFE_INTEGER;
  const mobility =
    role == node.role ? node.actions.length : -node.actions.length;
  let value = intermediate + mobility;
  if (node.visits !== 0) value += node.utility / node.visits;
  return value;
}

function select(node) {
  while (node.visits !== 0 && node.visits != 1) {
    let next = node.children[0];
    let score = selectfn(next, node.role);
    for (let i = 0; i < node.children.length; i++) {
      let newscore = selectfn(node.children[i], node.role);
      // Maximizing Node
      if (node.role == role && newscore > score) {
        score = newscore;
        next = node.children[i];
      }
      // Minimizing Node
      else if (node.role != role && newscore < score) {
        score = newscore;
        next = node.children[i];
      }
    }
    node = next;
  }
  return node;
}

function expand(node) {
  for (let i = 0; i < node.actions.length; i++) {
    let newstate = simulate(node.actions[i], node.state, library);
    let newnode = makenode(newstate, node);
    node.children[i] = newnode;
  }
  return node.children;
}

function depthcharge(state) {
  nodes++;
  if (findterminalp(state, library)) {
    terminals++;
    return findreward(role, state, library) * 1;
  }
  var actions = findlegals(state, library);
  if (actions.length === 0) return 0;
  var newstate = simulate(actions[randomindex(actions.length)], state, library);
  return depthcharge(newstate);
}

function backpropagate(node, score) {
  node.visits = node.visits + 1;
  node.utility = node.utility + score;
  let parent = node.parent;
  while (parent) {
    parent.visits += 1;
    parent.utility += score;
    parent = parent.parent;
  }
}

function action(node) {
  console.log("Action", node);
  let action = node.actions[0];
  let val = evaluate(node.children[0]);
  let choices = [];
  choices.push([action, val]);
  for (let i = 1; i < node.children.length; i++) {
    const new_val = evaluate(node.children[i]);
    choices.push([node.actions[i], new_val]);
    if (new_val > val) {
      val = new_val;
      action = node.actions[i];
    }
  }
  return [action, val, choices];
}

function randomindex(n) {
  return Math.floor(Math.random() * n);
}

function makenode(state, parent) {
  return {
    parent: parent,
    state: state,
    role: findcontrol(state, library),
    actions: findlegals(state, library),
    children: [],
    visits: 0,
    utility: 0,
  };
}

function selectfn(node, r) {
  return role == r
    ? node.utility / node.visits +
        exploration * Math.sqrt(Math.log(node.parent.visits) / node.visits)
    : node.utility / node.visits -
        exploration * Math.sqrt(Math.log(node.parent.visits) / node.visits);
}

//==============================================================================
// Basics
//==============================================================================

function findroles(rules) {
  return compfinds("R", seq("role", "R"), seq(), rules);
}

function findbases(rules) {
  return compfinds("P", seq("base", "P"), seq(), rules);
}

function findactions(rules) {
  return compfinds("A", seq("action", "A"), seq(), rules);
}

function findinits(rules) {
  return compfinds("P", seq("init", "P"), seq(), rules);
}

function findcontrol(facts, rules) {
  if (grounded) return grounditem("control", facts, rules);
  return compfindx("X", seq("control", "X"), facts, rules);
}

function findlegalp(move, facts, rules) {
  if (grounded) return groundfindp(seq("legal", move), facts, rules);
  return compfindp(seq("legal", move), facts, rules);
}

function findlegalx(facts, rules) {
  if (grounded) return grounditem("legal", facts, rules);
  return compfindx("X", seq("legal", "X"), facts, rules);
}

function findlegals(facts, rules) {
  if (grounded) return grounditems("legal", facts, rules);
  return compfinds("X", seq("legal", "X"), facts, rules);
}

function findreward(role, facts, rules) {
  const value = grounded
    ? groundvalue("goal", role, facts, rules)
    : compfindx("R", seq("goal", role, "R"), facts, rules);
  return value ? value : 0;
}

function findterminalp(facts, rules) {
  if (grounded) return groundfindp("terminal", facts, rules);
  return compfindp("terminal", facts, rules);
}

//------------------------------------------------------------------------------

function simulate(move, state, rules) {
  const deltas = grounded
    ? groundexpand(move, state, rules)
    : compexpand(move, state, rules);
  var additions = [];
  var deletions = [];
  for (var i = 0; i < deltas.length; i++) {
    if (symbolp(deltas[i])) {
      additions.push(deltas[i]);
      continue;
    }
    if (deltas[i][0] === "not") {
      deletions.push(deltas[i][1]);
      continue;
    }
    additions.push(deltas[i]);
  }
  var newstate = [];
  for (i = 0; i < state.length; i++) {
    if (find(state[i], additions)) {
      continue;
    }
    if (find(state[i], deletions)) {
      continue;
    }
    newstate.push(state[i]);
  }
  return newstate.concat(additions);
}
