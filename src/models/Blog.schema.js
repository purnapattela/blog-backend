import { Schema, model } from "mongoose";


const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
        default: "https://placehold.co/1200x630?text=&font=roboto"
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        default: "draft",
        enum: ["draft", "private", "published"]
    },
    publishedAt: {
        type: Date
    },
    tags: {
        type: [String],
        default: []
    }
}, {
    timestamps: true
})

export default model("Blog", blogSchema);