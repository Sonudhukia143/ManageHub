import { Event } from "../models/Event.js";

export default async function getAllEvents(req, res) {
    try {
        const events = await Event.find({})
            .populate("eventname", "eventdescription") // Only fetch the admin's name
            .lean()
            .exec();

        const formattedEvents = events.map(event => ({
            _id: event._id,
            eventname: event.eventname,
            eventdescription: event.eventdescription,
            id:event._id.toString()
        }));

        return res.status(200).json({message:"Events fetched successfully",formattedEvents:formattedEvents});
    } catch (error) {
        console.error("Error fetching events:", error);
        return res.status(500).json({ message: "Error fetching events", error });
    }
}
