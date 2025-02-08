import { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthProvider.jsx";
import Loader from "../helperComponent/Loader.jsx";
import { Link } from "react-router-dom";
import FlashMessage from "../helperComponent/FlashMessage.jsx";

export default function Homepage() {
    const {state} = useAuthContext();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:3000/api/events", {
                credentials: "include",
            });
            const data = await response.json();
            setEvents(data.formattedEvents);
            setMessage(data.message);
        } catch (error) {
            setMessage("Error in fetching all events");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Upcoming Events</h1>

            {message && <FlashMessage message={message} /> }
            {loading ? <Loader message={"Loading Events..."} /> : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map(event => (
                        <div>
                            <div key={event._id} className="bg-white shadow-md rounded-lg p-4">
                                <h2 className="text-xl font-semibold">{event.eventname}</h2>
                                <p className="text-gray-600">About event: {event.eventdescription}</p>
                                {
                                 state.isLoggedIn && <button className="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"><Link to={`/event/${event.id}`}>View Event</Link></button>
                                }
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
