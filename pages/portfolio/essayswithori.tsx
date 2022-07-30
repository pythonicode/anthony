import NotFinished from "@/components/interface/NotFinished";
import Layout from "@/components/layout/Layout";
import CodeBlock from "@/components/typography/CodeBlock";
import Title from "@/components/typography/Title";
import { motion } from "framer-motion";
import type { NextPage } from "next";
import { useTheme } from "next-themes";
import Image from "next/image";
import { FaGithub, FaLink } from "react-icons/fa";

const EssaysWithOri: NextPage = () => {
  const { theme } = useTheme();

  return (
    <Layout>
      {theme == "light" ? (
        <Image
          src="/images/portfolio/essayswithori/landing_light.png"
          alt="Essays With Ori"
          width="1156px"
          height="650px"
          layout="responsive"
          draggable={false}
        />
      ) : (
        <Image
          src="/images/portfolio/essayswithori/landing_dark.png"
          alt="Essays With Ori"
          width="1156px"
          height="650px"
          layout="responsive"
          draggable={false}
        />
      )}
      <a
        title="Essays with Ori"
        href="https://essayswithori.com/"
        className="w-full"
      >
        <motion.div
          animate={{
            scale: [0.95, 1, 0.95],
            transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
          className="w-full rounded p-4 my-8 bg-purple-500 text-white font-bold flex items-center justify-center text-xl gap-8"
        >
          <FaLink />
          Visit the Website
        </motion.div>
      </a>

      <Title color="purple">
        How to make a stunning website in under three days.
      </Title>
      <div className="flex flex-col md:flex-row md:items-center gap-20">
        <motion.div
          className="relative w-20 h-20"
          animate={{
            x: [0, 250, 0],
            rotate: [0, 90, -45, 180, -40, 80, 0],
            transition: { duration: 2, repeat: Infinity },
          }}
          whileHover={{ scale: 1.1 }}
        >
          <a title="Mantine" href="https://mantine.dev/">
            <Image
              src="/images/portfolio/essayswithori/mantine.png"
              alt="Mantine Logo"
              width="100px"
              height="100px"
              className="rounded-xl"
              draggable={false}
            />
          </a>
        </motion.div>
        <h3 className="font-mono text-center md:text-right text-5xl font-bold grow">
          react <br /> component <br /> libraries
        </h3>
      </div>
      <div className="flex flex-col-reverse md:flex-row md:items-center gap-20 my-20">
        <h3 className="font-mono text-center md:text-right text-5xl font-bold">
          store <br /> data in <br /> firebase
        </h3>
        <motion.div
          className="relative w-20 h-20"
          animate={{
            x: [0, 250, 0],
            rotate: [0, 5, -5, 5, 0],
            transition: { duration: 2, repeat: Infinity },
          }}
          whileHover={{ scale: 1.1 }}
        >
          <a title="Firebase" href="https://firebase.google.com/">
            <Image
              src="/images/portfolio/essayswithori/firebase.png"
              alt="Mantine Logo"
              width="222px"
              height="302px"
              className="rounded-xl"
              draggable={false}
            />
          </a>
        </motion.div>
      </div>
      <div className="flex flex-col md:flex-row md:items-center gap-20">
        <motion.div
          className="relative w-20 h-20"
          animate={{
            x: [0, 250, 0],
            rotate: [0, 20, -40, 5, -95, 0],
            transition: { duration: 4, repeat: Infinity },
          }}
          whileHover={{ scale: 1.1 }}
        >
          <a title="Vercel" href="https://vercel.com/">
            <Image
              src="/images/portfolio/essayswithori/vercel.jpg"
              alt="Mantine Logo"
              width="100px"
              height="100px"
              className="rounded-xl"
              draggable={false}
            />
          </a>
        </motion.div>
        <h3 className="font-mono text-center md:text-right text-5xl font-bold grow">
          deploy <br /> on <br /> vercel
        </h3>
      </div>
      <div className="flex flex-row gap-4 my-20 w-full">
        <motion.a
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          href="https://github.com/pythonicode/essays-with-ori"
          className="grow"
        >
          <div className="flex flex-row p-4 bg-dark rounded gap-4 items-center justify-center border w-full">
            <FaGithub color="white" size="32px" />
            <h4 className="text-white text-xl font-bold pb-1">
              Source Code on GitHub
            </h4>
          </div>
        </motion.a>
      </div>
      <Title color="purple">Code Snippets</Title>
      <CodeBlock
        title="Contact Form Cloud Function"
        language="typescript"
        link="https://github.com/pythonicode/essays-with-ori/blob/a4707dbac294aa77ee754cfcef545f9b3034d417/pages/api/contact.ts#L4-L40"
      >
        {
          "export default async function handler(request: NextApiRequest, response: NextApiResponse) {\n  const transporter = createTransport({\n    host: 'smtp.gmail.com',\n    port: 465,\n    secure: true, // use TLS\n    auth: {\n      user: 'essayswithori@gmail.com',\n      pass: process.env.SMTP_PASSWORD,\n    },\n  });\n  const info = await transporter.sendMail({\n    from: 'Essays with Ori (essayswithori@gmail.com)',\n    to:\n      process.env.NODE_ENV == 'development' ? 'anthony.j.riley@gmail.com' : 'orianariley@gmail.com',\n    subject: `Message from ${request.body.sender.firstname} ${request.body.sender.lastname} (${request.body.sender.email}): ${request.body.subject}`, // subject line\n    text: request.body.message, // plain text body\n  });\n  response.status(200).json({\n    status: info.accepted\n      ? 'success'\n      : info.pending\n      ? 'pending'\n      : info.rejected\n      ? 'rejected'\n      : 'unknown',\n  });\n}"
        }
      </CodeBlock>
    </Layout>
  );
};

export default EssaysWithOri;
