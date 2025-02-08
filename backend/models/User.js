import mongoose from "mongoose";
import Joi from "joi";

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        unique: true 
    },
    gmail: { 
        type: String, 
        unique: true 
    },
    password: { 
        type: String, 
    },
    joinedEvents: [{ type:mongoose.Schema.Types.ObjectId , ref: "Event"}]
});

const User = mongoose.model("User", userSchema);

const validateUser = (user) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(30).required(),
        gmail: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });
    return schema.validate(user);
};

export { User, validateUser };