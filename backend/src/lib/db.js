import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
    try {
        if (!ENV.DB_URL) {
            throw new Error("Database URL is not defined");
        }
        const conn = await mongoose.connect(ENV.DB_URL);
        console.log("Database connected", conn.connection.host);
    } catch (error) {
        console.log("Error connecting to database", error);
        process.exit(1);
    }
}   