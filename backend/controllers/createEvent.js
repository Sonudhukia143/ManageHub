import { Event,validateEvent } from '../models/Event.js';
import db from "../firebase/firebase.js";
import { doc , setDoc} from "firebase/firestore";

export default async function createEvent(req, res) {
    const { error } = validateEvent(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { eventname,eventstart,eventend,eventdescription,mode } = req.body;
    const admin = req.user;

    try {
        const newEvent = new Event({ eventname,eventstart,eventend,eventdescription,mode,admin });
        if(!newEvent) return res.send(404).json({message:"Couldnot create event"});

        const savedEvent = await newEvent.save();
        if(!savedEvent) return res.send(400).json({message:"Unable to save event."});

        try {
            await setDoc(doc(db , "events", savedEvent._id.toString()), {
                eventId:savedEvent._id.toString(),
                currentAttendees:0,
            });
        }catch(error) {
            console.log("unable to save setDOC");
            return res.status(404).json({message:"Could not save the event in firebase"});
        }

        return res.status(200).json({ message: 'Creation of event successful', eventData:savedEvent._id.toString() });
    } catch (error) {
        if (error) {
            return res.status(400).json({ message: "Unexpected Error" + error});
        }
        return res.status(500).json({ message: "Internal server error"});
    }
}

