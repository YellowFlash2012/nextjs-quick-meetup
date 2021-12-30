import Head from "next/head"

import MeetupList from "../components/meetups/MeetupList"

import { MongoClient } from "mongodb";



const DUMMY_MEETUPS = [
    {
        id: "m1",
        title: "A 1st meetup",
        image: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg",
        address: "5, street view 25678 MN",
        description: "This is our 1st meetup",
    },
    {
        id: "m2",
        title: "A 2nd meetup",
        image: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg",
        address: "5, glasgow marshall 75425 Xiangshi",
        description: "This is our 2nd meetup",
    },
    {
        id: "m3",
        title: "A 3rd meetup",
        image: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg",
        address: "7th, mountain valley 48654 Dalian Shi",
        description: "This is our 3rd meetup",
    },
];

const HomePage = (props) => {
    return (
        <>
            <Head>
                <title>Web 3.0 Meetups</title>
            </Head>

            <MeetupList meetups={props.meetups} />
        </>
    );
    
}

export async function getStaticProps() {
    // fetch data from an api
const client = await MongoClient.connect(
    `mongodb+srv://super-admin:${process.env.NEXT_PUBLIC_MONGO_KEY}@cluster0.qyou3.mongodb.net/nextjs-meetups?retryWrites=true&w=majority`
);

const db = client.db();

    const meetupsCollection = db.collection("meetups");
    
    const meetups = await meetupsCollection.find().toArray();

    client.close();

    return {
        props: {
            meetups: meetups.map((mt) => ({
                title: mt.title,
                address: mt.address,
                image: mt.image,
                id:mt._id.toString()
            }))
        },
        revalidate:1
    }
}

export default HomePage

