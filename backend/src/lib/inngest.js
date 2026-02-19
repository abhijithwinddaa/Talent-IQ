import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import { User } from "../models/User.js";
import { ENV } from "./env.js";

export const inngest = new Inngest({
    id: "Talent IQ"
});

const syncUser = inngest.createFunction({
    id: "sync-user"
},
    { event: "clerk/user.created" },
    async ({ event, step }) => {
        await connectDB();
        const { data } = event.data;
        const { id, email_addresses, username, first_name, last_name, image_url } = data;

        const newUser = await User.create({
            clerkId: id,
            email: email_addresses[0].email_address,
            name: `${first_name} ${last_name}`,
            profileImage: image_url
        })

        await User.create(newUser)
    }

)

const deleteUserFromDB = inngest.createFunction({
    id: "delete-user-from-db"
},
    { event: "clerk/user.deleted" },
    async ({ event, step }) => {
        await connectDB();
        const { data } = event.data;
        const { id } = data;

        await User.deleteOne({ clerkId: id });
    }

)

export const functions = [syncUser, deleteUserFromDB];