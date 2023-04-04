importScripts("../library/epilog.js");
importScripts("../library/grounder.js");
importScripts("../library/prune.js");

function adjustlegalities(actions, oldrules, newrules) {
  const oldlegals = indexees("legal", oldrules);
  const newlegals = getlegalities(actions, newrules);
  const rules = difference(oldrules, oldlegals).concat(newlegals);
  return rules;
}

function getlegalities(actions, rules) {
  var legals = [];
  for (var i = 0; i < rules.length; i++) {
    var head = rulehead(rules[i]);
    if (!symbolp(head) & (head[0] === "legal") && findp(head[1], actions))
      legals.push(rules[i]);
  }
  return legals;
}

function getgoalprops(role, grounds) {
  var props = [];
  for (var i = 0; i < grounds.length; i++) {
    if (symbolp(grounds[i])) {
      continue;
    }
    if (symbolp(grounds[i][1])) {
      continue;
    }
    if (grounds[i][1][0] === "goal" && grounds[i][1][1] === role) {
      props = adjoinit(grounds[i][1], props);
    }
  }
  return props;
}

onmessage = (event) => {
  const { library, role, startclock } = event.data;
  console.log(`[Optimizer] 📩 Received library, starting optimizations.`);
  const start = Date.now();
  const deadline = Date.now() + (startclock - 2) * 1000;
  var grounds = groundrules(library, deadline);
  if (!grounds) {
    console.log(
      `[Optimizer] ❌ Optimization timed out after ${startclock} seconds.`
    );
    return;
  }
  var props = getgoalprops(role, grounds);
  var actions = [];
  for (var i = 0; i < props.length; i++)
    actions = compchangers(props[i], actions, grounds);
  var actions = compchangers("terminal", actions, grounds);
  for (var i = 0; i < actions.length; i++)
    actions = compchangers(seq("legal", actions[i]), actions, grounds);
  const grounded = definemorerules([], grounds);
  var newrules = adjustlegalities(actions, grounded, grounds);
  var newlibrary = definemorerules([], newrules);
  event.ports[0].postMessage({ library: newlibrary });
  const end = Date.now();
  console.log(`[Optimizer] ✔️ Finished optimizations in ${end - start} ms.`);
};
