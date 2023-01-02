import { supabase_admin } from "@/lib/supabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== "GET") return res.status(405).json({ error: "Wrong method. Use GET instead." });
    const slug = req.query.slug;
    if(!slug) return res.status(400).json({ error: "Slug is required." });
    const response = await supabase_admin
        .from('posts')
        .select()
        .eq('slug', slug)
        .single();
    if (response.error) return res.status(500).json({ error: response.error });
    const views = response.data ? response.data.views : 0;
    if (process.env.NODE_ENV === 'production') {
        const { error } = await supabase_admin
            .from('posts')
            .update({ views: views + 1 })
            .eq('slug', slug);
        if (error) return res.status(500).json({ error: error });
    }
    res.status(200).json({ views: views + 1 });
}