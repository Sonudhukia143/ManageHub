import { Event } from "../models/Event.js";

export default async function getEventDetails(req, res) {
    try {
        if (!req.user) return res.status(401).json({ message: "Unauthorized: Please log in" });
    
        const { id } = req.params;
        if(!id) return res.status(404).json({message:"Event Id not provided."});

        const event = await Event.findById({_id:id})
        .populate("attendees", "gmail")
        .populate("admin", "gmail");

        if(!event) return res.status(404).json({message:"Event not found"})

        return res.status(200).json({message:"Fetched Event Details Successfully",event:event});
    } catch (error) {
        console.error("Error fetching event details:", error);
        return res.status(500).json({ message: "Internal Server Error", error });
    }
}
