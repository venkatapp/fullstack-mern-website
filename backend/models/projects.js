import mongoose from "mongoose";

const projectsSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    image: { type: String },
    technologies: { type: String },
    link: { type: String },
})

export const Projects = mongoose.model("Projects", projectsSchema);
