import { useState } from "react";
import FlashMessage from "../helperComponent/FlashMessage.jsx";
import Loader from "../helperComponent/Loader.jsx";
import validateForm from "../utils/validateForm.js";
import { useNavigate } from "react-router-dom";

export default function CreateEventForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        eventname: "",
        eventstart: "",
        eventend: "",
        eventdescription: "",
        mode: "",
    });
    const [message, setMessage] = useState("");
    const [validation, setValidation] = useState({
        eventname: true,
        eventstart: true,
        eventend: true,
        eventdescription: true,
        mode: true,
    });
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        const { id, value } = e.target;

        setFormData({
            ...formData,
            [id]: value,
        });

        setValidation({
            ...validation,
            [id]: value.trim() !== "",
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!validateForm(validation, formData, setValidation)) {
            setMessage("Please fill in all required fields correctly.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("https://bank-website-41tu.vercel.app/api/createEvent", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `${localStorage.getItem('token')}`
                 },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            setMessage(data.message);

            if (response.ok) {
                navigate(`/event/${data.eventData}`);
            }
        } catch (error) {
            setMessage(data.message);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                <h1 className="text-2xl font-bold text-center mb-4">Create an Event</h1>
                {message && <FlashMessage message={message} />}
                {loading && <Loader message={"Organizing Event"} />}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="eventname" className="block text-sm font-medium text-gray-700">
                            Event Name
                        </label>
                        <input
                            type="text"
                            id="eventname"
                            value={formData.eventname}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${validation.eventname ? "border-gray-300" : "border-red-500"
                                }`}
                            required
                        />
                        {!validation.eventname && <p className="text-red-500 text-xs mt-1">Event name is required.</p>}
                    </div>

                    <div>
                        <label htmlFor="eventstart" className="block text-sm font-medium text-gray-700">
                            Event Start Date & Time
                        </label>
                        <input
                            type="datetime-local"
                            id="eventstart"
                            value={formData.eventstart}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${validation.eventstart ? "border-gray-300" : "border-red-500"
                                }`}
                            required
                        />
                        {!validation.eventstart && <p className="text-red-500 text-xs mt-1">Start date & time should be valid atleast 10 days before event.</p>}
                    </div>

                    <div>
                        <label htmlFor="eventend" className="block text-sm font-medium text-gray-700">
                            Event End Date & Time
                        </label>
                        <input
                            type="datetime-local"
                            id="eventend"
                            value={formData.eventend}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${validation.eventend ? "border-gray-300" : "border-red-500"
                                }`}
                            required
                        />
                        {!validation.eventend && <p className="text-red-500 text-xs mt-1">End date & time is required to be valid after event start.</p>}
                    </div>

                    <div>
                        <label htmlFor="eventdescription" className="block text-sm font-medium text-gray-700">
                            Event Description
                        </label>
                        <textarea
                            id="eventdescription"
                            rows="3"
                            value={formData.eventdescription}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${validation.eventdescription ? "border-gray-300" : "border-red-500"
                                }`}
                            required
                        ></textarea>
                        {!validation.eventdescription && <p className="text-red-500 text-xs mt-1">Description is required.</p>}
                    </div>

                    <div>
                        <label htmlFor="mode" className="block text-sm font-medium text-gray-700">
                            Mode (Online/Offline)
                        </label>
                        <select
                            id="mode"
                            value={formData.mode}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${validation.mode ? "border-gray-300" : "border-red-500"
                                }`}
                            required
                        >
                            <option value="">Select Mode</option>
                            <option value="online">Online</option>
                            <option value="online and offline">Online & Offline</option>
                        </select>
                        {!validation.mode && <p className="text-red-500 text-xs mt-1">Please select a mode.</p>}
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
                        >
                            Create Event
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
