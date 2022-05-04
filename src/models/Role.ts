import { Schema, model } from "mongoose";
import { Job } from "../types/Job";

const roleSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    barotraumaJob: {
        type: String,
        enum: Job,
        required: true,
    },
    goal: {
        type: String,
        required: true,
    },
    winCondition: {
        type: String,
        required: true,
    },
    additionalInfo: String,
    tips: String
});

const Role = model("Role", roleSchema);

export default Role;