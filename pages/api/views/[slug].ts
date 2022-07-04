import { admin } from "@/lib/firebase-admin";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
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
  }
};

export default handler;
