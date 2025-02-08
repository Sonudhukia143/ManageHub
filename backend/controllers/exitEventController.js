import db from "../firebase/firebase.js";
import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import {Event} from "../models/Event.js";
import { User } from "../models/User.js";

export default async function exitEvent(req, res) {
    const userId = req.user;
    const eventId = req.params.id;
    if (!userId || !eventId) return res.status(404).json({ message: "Credentials cannot be empty" });

    try {
        const user = await User.findById({_id:userId});
        if (!user) return res.status(404).json({ message: "User not found" });

        const event = await Event.findById(eventId);
        if (!event) return res.status(404).json({ message: "Event not found" });

        user.joinedEvents = user.joinedEvents.filter(id => id.toString() != eventId);
        await user.save();

        // Remove user from event's attendee list
        event.attendees = event.attendees.filter(id => id.toString() != userId.toString());
        event.currentAttendess -= 1;

        await event.save(); // Save updated event
        await updateDoc(doc(db, "events", eventId.toString()), {
            attendees: arrayRemove(userId.toString()),
            currentAttendess: event.currentAttendess,
        });

    return res.status(200).json({ message: "User exited event successfully" });
} catch (error) {
    return res.status(500).json({ message: "Internal server error " + error });
}
};
