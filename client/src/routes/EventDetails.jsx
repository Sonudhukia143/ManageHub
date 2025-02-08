import { useEffect, useState } from "react";
import { useParams, useNavigate, data } from "react-router-dom";
import { useAuthContext } from "../context/AuthProvider.jsx";
import Loader from "../helperComponent/Loader.jsx";
import FlashMessage from "../helperComponent/FlashMessage.jsx";

export default function EventDetails() {
    const { state } = useAuthContext(); // Get logged-in user state
    const { id } = useParams(); // Get event ID from URL
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!state.isLoggedIn) {
            setMessage("You need to log in to view event details.");
            setLoading(false);
            return;
        }
        setLoading(true);

        async function fetchEventDetails() {
            try {
                const response = await fetch(`https://bank-website-41tu.vercel.app/api/event/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    },
                });

                if (!response.ok) throw new Error("Failed to fetch event details");

                const data = await response.json();
                setEvent(data.event);
            } catch (error) {
                setMessage(error.message);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        }

        fetchEventDetails();
    }, []); // Ensure re-fetch when event ID or login state changes

    async function handleEvent(action) {
        try {
            setLoading(true);
            const response = await fetch(`https://bank-website-41tu.vercel.app/api/${action}/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) throw new Error(`Failed to ${action} event`);

            const data = await response.json();
            navigate('/events');
            setMessage(data.message);
        } catch (error) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    }

    const isUserAttending = event?.attendees?.some(attendee => attendee.gmail === localStorage.getItem('gmail'));

    return (
        <>
            {loading && <Loader message={"Loading event details"} />}
            {message && <FlashMessage message={message} />}
            {event ? (
                <div className="flex flex-col items-center p-6">
                    <h1 className="text-3xl font-bold">{event.eventname}</h1>
                    <p className="mt-4">{event.eventdescription}</p>
                    <p className="mt-2 text-sm text-gray-500">
                        Starts: {new Date(event.eventstart).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">
                        Ends: {new Date(event.eventend).toLocaleString()}
                    </p>
                    <p className="mt-4 font-semibold">Mode: {event.mode}</p>

                    <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
                        <h2 className="text-lg font-semibold">Admin:</h2>
                        <p className="text-gray-700">{event.admin?.gmail || "Unknown"}</p>
                    </div>

                    <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow w-full max-w-md">
                        <h2 className="text-lg font-semibold">Attendees:</h2>
                        {event?.attendees?.length > 0 ? (
                            <ul className="list-disc pl-5">
                                {event.attendees.map((attendee) => (
                                    <li key={attendee._id} className="text-gray-700">
                                        {attendee.gmail}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">No attendees yet.</p>
                        )}
                    </div>

                    <button
                        onClick={() => navigate("/events")}
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                        Back to Events
                    </button>

                    {state.isLoggedIn && (
                        <button
                            onClick={() => handleEvent(isUserAttending ? "exitevent" : "joinevent")}
                            className={`mt-4 px-6 py-2 rounded-md text-white font-semibold transition duration-200 ease-in-out ${
                                isUserAttending
                                    ? "bg-red-500 hover:bg-red-600"
                                    : "bg-green-500 hover:bg-green-600"
                            } cursor-pointer`}
                        >
                            {isUserAttending ? "Exit Event" : "Join Event"}
                        </button>
                    )}
                </div>
            ) : (
                <h1>Error fetching details about the event.</h1>
            )}
        </>
    );
}
