import { Schema } from "mongoose";

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
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {timestamps:true}
)



export const Idea = mongoose.model("Idea", ideaSchema);