// pages/api/view.js
// Author: HumanThe2nd
// Created: 2025-04-04

import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const slug = req.query.slug;
  if (!slug) return res.status(400).json({ error: "Missing slug" });

  try {
    const client = await clientPromise;
    const db = client.db("portfolio");
    const views = db.collection("views");

    const result = await views.findOneAndUpdate(
      { slug },
      { $inc: { count: 1 } },
      { upsert: true, returnDocument: "after" }
    );

    res.status(200).json({ count: result.value.count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update view count" });
  }
}

