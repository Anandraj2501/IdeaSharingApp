import mongoose, { Schema } from "mongoose";

const ideaSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true
        },
        tags: [String],
        images:[String],
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {timestamps:true}
)



export const Idea = mongoose.model("Idea", ideaSchema);