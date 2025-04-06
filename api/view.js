/*
Author: HumanThe2nd
Created: 2025-04-04
Updated: 2025-04-06
*/
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const dbName = 'portfolio';

export default async function handler(req, res) {
  const slug = req.query.slug;
  if (!slug) return res.status(400).json({ error: 'Missing slug' });

  try {
    if (!client.topology || !client.topology.isConnected()) {
      await client.connect();
    }

    const db = client.db(dbName);
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

