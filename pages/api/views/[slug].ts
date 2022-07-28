import { admin } from "@/lib/firebase-admin";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (process.env.NODE_ENV !== "production")
    return res.status(400).json({ error: "Only available in production." });
  else if (req.method === "POST") {
    const ref = admin.firestore().doc(`post/${req.query.slug}`);
    try {
      const views = await admin
        .firestore()
        .runTransaction(async (transaction) => {
          const doc = await transaction.get(ref);
          const now = doc.data() ? doc.data()!.views + 1 : 1;
          if (doc.exists) transaction.update(ref, { views: now });
          else transaction.set(ref, { views: now });
          return now;
        });

      return res.status(201).json({
        views: views,
      });
    } catch (error) {
      return res.status(500).json({
        error: error,
      });
    }
  } else res.status(405).json({ error: "Wrong method. Use POST instead." });
};

export default handler;
