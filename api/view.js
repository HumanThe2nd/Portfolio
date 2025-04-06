// Author: HumanThe2nd
// Created: 2025-04-04

import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
let cachedClient = null;

export default async function handler(req, res) {
  const slug = req.query.slug;
  if (!slug) return res.status(400).json({ error: 'Missing slug' });

  try {
    if (!cachedClient) {
      cachedClient = new MongoClient(uri);
      await cachedClient.connect();
    }

    const db = cachedClient.db('portfolio');
    const views = db.collection('views');

    const result = await views.findOneAndUpdate(
      { slug },
      { $inc: { count: 1 } },
      { upsert: true, returnDocument: 'after' }
    );

    res.status(200).json({ count: result.value.count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update view count' });
  }
}
