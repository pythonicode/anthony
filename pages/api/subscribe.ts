import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const email = req.query.email;

    if (!email) {
      res.status(400).json({
        error: "Email is required.",
      });
    }
    try {
      const result = await fetch("https://www.getrevue.co/api/v2/subscribers", {
        method: "POST",
        headers: {
          Authorization: `Token ${process.env.REVUE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await result.json();

      if (!result.ok)
        res.status(500).json({
          error: data.error.email[0],
        });
      else res.status(200).json({ status: "success", email: email });
    } catch (error) {
      res.status(500).json({
        error: "Unhandled server error. Please wait and try again later.",
      });
    }
  } else res.status(405).json({ error: "Wrong method. Use POST instead." });
};

export default handler;
