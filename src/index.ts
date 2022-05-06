console.clear();

import App from "./App";
import database from "mongoose";
import config from "./Config";

const connectionString = config.CONNECTION_STRING;

database.connect(connectionString, () => console.log("Connected to database"));

new App().run();