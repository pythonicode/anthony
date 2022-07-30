import NotFinished from "@/components/interface/NotFinished";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import type { NextPage } from "next";
import Image from "next/image";
import { FaGithub, FaYoutube } from "react-icons/fa";
import CodeBlock from "@/components/typography/CodeBlock";
import Title from "@/components/typography/Title";

const Discharge: NextPage = () => {
  return (
    <Layout>
      <div className="flex flex-col md:flex-row gap-8">
        <motion.img
          animate={{
            scale: [1, 0.8, 0.8, 1, 1],
            rotate: [0, 0, 270, 270, 0],
            borderRadius: ["20%", "20%", "50%", "50%", "20%"],
            transition: {
              duration: 2,
            },
          }}
          drag
          dragConstraints={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          src="/images/portfolio/discharge/chainlink.svg"
          alt="Chainlink"
          className="w-full md:w-1/3 cursor-pointer"
          draggable={false}
        />
        <div className="flex flex-col">
          <h1 className="text-5xl font-bold mb-8">Discharge</h1>
          <a
            href="https://chain.link/hackathon"
            target="_blank"
            rel="noopener noreferrer"
          >
            <code className="font-bold text-3xl hover:text-blue-500 transition-colors duration-300">
              chainlink 2022 spring hackathon winner!
            </code>
          </a>
          <code className="text-xl mt-8">$7,500 Filecoin - On the Tools</code>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center gap-8">
        <div className="bg-black dark:bg-white w-2 h-20" />
        <h2 className="w-full text-3xl font-bold my-20">
          Free, secure, unlimited data storage powered by FileCoin.
        </h2>
      </div>
      <div className="flex flex-col md:flex-row gap-8 mb-20">
        <motion.div
          whileHover={{ rotate: -2 }}
          className="relative cursor-pointer rounded"
        >
          <Image
            src="/images/portfolio/discharge/welcome.png"
            alt="Discharge"
            width="396px"
            height="598px"
            draggable={false}
          />
        </motion.div>
        <motion.div
          whileHover={{ rotate: 2 }}
          className="relative cursor-pointer rounded"
        >
          <Image
            src="/images/portfolio/discharge/signup.png"
            alt="Discharge"
            width="396px"
            height="598px"
            draggable={false}
          />
        </motion.div>
      </div>
      <div className="flex flex-row gap-4 mb-20 w-full">
        <motion.a
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          href="https://github.com/pythonicode/discharge"
          className="grow"
        >
          <div className="flex flex-row p-4 bg-dark rounded gap-4 items-center justify-center border w-full">
            <FaGithub color="white" size="32px" />
            <h4 className="text-white text-xl font-bold pb-1">
              Open in GitHub
            </h4>
          </div>
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          href="https://www.youtube.com/watch?v=eDOFad7iedQ"
          className="grow"
        >
          <div className="flex flex-row p-4 bg-red-500 rounded gap-4 items-center justify-center w-full">
            <FaYoutube color="white" size="32px" />
            <h4 className="text-white text-xl font-bold pb-1">Watch Demo</h4>
          </div>
        </motion.a>
      </div>
      <Title color="blue">Code Snippets</Title>
      <CodeBlock
        title="File Encryption using AES-256-CBC Cipher"
        language="javascript"
        link="https://github.com/pythonicode/discharge/blob/a6832e5545d29e288f5d59c69974682569b2d4d7/electron/estuary.ts#L95-L116"
      >
        {
          "export async function encrypt(path: string, key: string, out: string) {\n  const name = path.substring(path.lastIndexOf('\\\\') + 1)\n  const bytes =\n    key.length >= 32\n      ? Buffer.from(key).slice(0, 32)\n      : Buffer.from(key).slice(0, key.length) + '-'.repeat(32 - key.length)\n  if (bytes.length != 32)\n    throw new Error('Encryption key is unstable in estuary.ts: encrypt()')\n  const iv = crypto.randomBytes(IV_LENGTH)\n  const cipher = crypto.createCipheriv('aes-256-cbc', bytes, iv)\n  const input = fs.createReadStream(path)\n  const output = fs.createWriteStream(join(out, name + '.enc'))\n  await new Promise((fulfill, reject) =>\n    output.write(iv, (err: any) => {\n      if (err) reject(err)\n      else fulfill(null)\n    })\n  )\n  const pipe = pipeline(input, cipher, output, (err: any) => console.error(err))\n  await new Promise(fulfill => pipe.on('finish', fulfill))\n  return join(out, name + '.enc')\n}"
        }
      </CodeBlock>
      <CodeBlock
        title="Asynchronous Data Handling with Electron"
        language="javascript"
        link="https://github.com/pythonicode/discharge/blob/a6832e5545d29e288f5d59c69974682569b2d4d7/electron/main.ts#L206-L227"
      >
        {
          "ipcMain.on('app:file:download', async (event, data) => {\n    const file = data.file\n    const directory = data.directory.replace(/\\//g, '\\\\')\n    const path = await readItem(file, join(app.getPath('userData'), 'Temp'))\n    if (!fs.existsSync(join(preferences.get('path'), directory)))\n      fs.mkdirSync(join(preferences.get('path'), directory))\n    await decrypt(\n      path,\n      preferences.get('key'),\n      join(preferences.get('path'), directory)\n    )\n    event.reply(`client:file:loaded:${directory + file.name}`)\n  })"
        }
      </CodeBlock>
      <CodeBlock
        title="Downloading Files from the Web"
        language="javascript"
        link="https://github.com/pythonicode/discharge/blob/a6832e5545d29e288f5d59c69974682569b2d4d7/electron/estuary.ts#L39-L46"
      >
        {
          "export async function readItem(file: any, path: string) {\n  const res = await fetch(`https://dweb.link/ipfs/${file.cid}`)\n  const dest = fs.createWriteStream(join(path, file.name))\n  const data = res.body as fs.ReadStream\n  const pipe = pipeline(data, dest, (err: any) => console.error(err))\n  await new Promise(fulfill => pipe.on('finish', fulfill))\n  return join(path, file.name)\n}"
        }
      </CodeBlock>
    </Layout>
  );
};

export default Discharge;
