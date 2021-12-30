// /api/new-meetup

import { MongoClient } from "mongodb";

async function handler (req, res) {
    if (req.method === "POST") {
        const data = req.body;

        // const { title, image, address, description } = data;

        const client = await MongoClient.connect(
            `mongodb+srv://super-admin:${process.env.NEXT_PUBLIC_MONGO_KEY}@cluster0.qyou3.mongodb.net/nextjs-meetups?retryWrites=true&w=majority`
        );

        const db = client.db();

        const meetupsCollection = db.collection('meetups');

        const result = await meetupsCollection.insertOne(data);

        console.log(result);

        client.close();

        res.status(201).json({message: 'Meetup inserted!'})
    }
}

export default handler;