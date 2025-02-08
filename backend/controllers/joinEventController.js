import db from "../firebase/firebase.js";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import {Event} from "../models/Event.js"; // MongoDB model
import { User } from "../models/User.js";

export default async function joinEvent (req, res) {
  const userId = req.user;
  const eventId = req.params.id;
  if(!userId || !eventId) return res.status(404).json({message:"Credentials are required"});

  try {
    const isUser = await User.findById({_id:userId});
    if (!isUser) return res.status(404).json({message:"You need to be a verified user to join event"});

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.attendees.includes(userId)) return res.status(400).json({ message: "User already joined this event" });    

    // Update MongoDB
    event.attendees.push(userId); 
    event.currentAttendess += 1;

    isUser.joinedEvents.push(eventId);
    const savedUser = await isUser.save();
    if(!savedUser) return res.status(404).json({message:"Couldnot save user after adding event."})

    const savedEvent = await event.save();
    if(!savedEvent) return res.status(400).json({message:"Error in updating event at firebase"});

    // Update Firestore using only ObjectID
    try{
        const eventRef = doc(db, "events", eventId.toString());
        await updateDoc(eventRef, {
          attendees: arrayUnion(userId.toString()),
          currentAttendess: event.currentAttendess, 
        });
    }catch(error){
        if(error) return res.status(404).json({message:"Error in finding event at for realtime updation + firebase error"});
    }


    return res.status(200).json({ message: "Successfully joined the event" });
  } catch (error) {
    console.error("Error joining event:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
