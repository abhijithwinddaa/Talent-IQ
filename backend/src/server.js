import express from "express";
import path from "path";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";


const app = express();

const __dirname = path.resolve();


app.get("/health", (req, res) => {
    res.status(200).send({ message: "api is up and running" });
});

app.get("/books", (req, res) => {
    res.status(200).send({ message: "this is books end point" });
});

if (ENV.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("/{*any}", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}


const startServer = async () => {
    try {
        await connectDB();
        app.listen(ENV.PORT, () => {
            console.log("Server is running on port " + ENV.PORT);
        });
    } catch (error) {
        console.log("Error starting server", error);
        process.exit(1);
    }
}

startServer();