import mongoose from "mongoose";
import Joi from "joi";

const EventSchema = new mongoose.Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  eventname: {
    type: String,
  },
  eventstart: {
    type: Date,
    required:true,
  },
  eventend: {
    type: Date,
    required:true,
    index: {expires: 0},
  },
  eventdescription: {
    type: String,
  },
  mode:{
    type: String,
    enum: ["online", "online and offline"],
    required:true
  },
  attendees: [{ type:mongoose.Schema.Types.ObjectId , ref:"User"}],
  currentAttendess:{
    type:Number,
    default:0,
  },
});

const Event = mongoose.model("Event", EventSchema);

const validateEvent = (data) => {
  const schema = Joi.object({
    eventname: Joi.required(),
    eventstart: Joi.date()
      .greater(new Date(new Date().setDate(new Date().getDate() + 10))) 
      .required()
      .messages({
        "date.greater": "Event start date must be at least 10 days after today",
      }),
    eventend: Joi.date().greater(Joi.ref("eventstart")).required(),
    eventdescription: Joi.string().required(),
    mode: Joi.string().valid("online", "online and offline").required(),
  });
  return schema.validate(data);
};

export { Event, validateEvent };