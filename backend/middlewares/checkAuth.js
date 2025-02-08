import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "No token, authorization denied" });
    
    try {
        const decoded = jwt.verify(token, process.env.JSON_WEB_SECRET);

        const user = await User.findById(decoded.id).select("-password");
        if(!user) res.status(401).json({ message:"User Not Found"})

        req.user = user._id;
        req.username = user.username;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Token is not valid" });
    }
};

export default authMiddleware;