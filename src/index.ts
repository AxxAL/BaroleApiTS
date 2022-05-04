import App from "./App";
import database from "mongoose";

const connectionString = process.env.CONNECTION_STRING as string;

database.connect(connectionString, () => console.log("Connected to database"));

// Rename _id to id in json responses.
database.set('toJSON', {
    virtuals: true,
    transform: (doc, converted) => {
        delete converted._id;
    }
});

new App().run();