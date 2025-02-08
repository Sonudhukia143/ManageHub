import db from "../firebase/firebase.js";
import { doc, deleteDoc } from "firebase/firestore";
import { Event } from "../models/Event.js";
import { User } from "../models/User.js";

export default async function deleteEvent (req, res) {
  const { userId, eventId } = req.body; // Ensure userId is passed
  if (!userId || !eventId) return res.status(400).json({ message: "User ID and Event ID are required" });
  
  try {
    // Verify event exists
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Check if the user is the event admin
    if (event.admin.toString() !== userId) return res.status(403).json({ message: "You are not authorized to delete this event" });

    // Remove event from all users' joinedEvents
    await User.updateMany(
      { joinedEvents: eventId },
      { $pull: { joinedEvents: eventId } }
    );

    // Delete event from MongoDB
    await Event.findByIdAndDelete(eventId);

    // Delete event from Firestore
    try {
      await deleteDoc(doc(db, "events", eventId));
    } catch (error) {
      console.error("Error deleting Firestore event:", error);
    }
    return res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
