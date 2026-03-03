import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    skills: { type: String },
})

export const About = mongoose.model("About", aboutSchema);
