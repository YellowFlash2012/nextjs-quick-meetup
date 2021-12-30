import Head from "next/head";

import { useRouter } from "next/router";

import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const NewMeetupPage = () => {
    const router = useRouter();

    async function addMeetupHandler(enteredData) {
        const res = await fetch("/api/new-meetup", {
            method: "POST",
            body: JSON.stringify(enteredData),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();

        console.log(data);

        router.push("/");
    }

    return (
        <>
            <Head>
                <title>Add New Meetup</title>
            </Head>

            <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </>
    );
};

export default NewMeetupPage;
