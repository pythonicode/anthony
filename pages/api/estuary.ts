import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "GET") return res.status(405).json({ error: "Wrong method. Use GET instead." });
    const result = await fetch("https://api.estuary.tech/user/api-keys?expiry=3600h", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.ESTUARY_API_KEY}`,
        }
    });
    const data = await result.json();
    return res.status(200).json(data);
};

export default handler;
