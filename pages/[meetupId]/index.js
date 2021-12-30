import Head from "next/head";

import { MongoClient, ObjectId } from "mongodb";

const MeetupDetails = (props) => {
    return (
        <>
            <Head>
                <title>{props.meetupData.title}</title>
            </Head>

            <div className="=" meetup-detail-container>
                <div className="meetup-detail-img">
                    {props.meetupData.image}
                </div>

                <h1>{props.meetupData.title}</h1>

                <address>{props.meetupData.address}</address>
                <p>{props.meetupData.description}</p>
            </div>
        </>
    );
};

export async function getStaticPaths() {
    // fetch data from an api
    const client = await MongoClient.connect(
        `mongodb+srv://super-admin:${process.env.NEXT_PUBLIC_MONGO_KEY}@cluster0.qyou3.mongodb.net/nextjs-meetups?retryWrites=true&w=majority`
    );

    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

    client.close();

    return {
        fallback: 'blocking',
        paths: meetups.map((mtp) => ({
            params: { meetupId: mtp._id.toString() },
        })),
    };
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;
    // fetch data from an api
    const client = await MongoClient.connect(
        `mongodb+srv://super-admin:${process.env.NEXT_PUBLIC_MONGO_KEY}@cluster0.qyou3.mongodb.net/nextjs-meetups?retryWrites=true&w=majority`
    );

    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const selectedMeetup = await meetupsCollection.findOne({
        _id: ObjectId(meetupId),
    });

    client.close();

    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                image: selectedMeetup.image,
                description: selectedMeetup.description,
            },
        },
    };
}

export default MeetupDetails;
