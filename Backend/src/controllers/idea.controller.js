import { ApiResponse } from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { Idea } from "../models/idea.model.js";
import { APiError } from "../utils/ApiError.js";

//Add idea to the database.
const addIdea = asyncHandler(async (req, res, next) => {
    // Extract title, description, tags, and owner from request body
    const { title, description, tags } = req.body;

    if (!title, !description) {
        throw new APiError(400, "Title or description is missing");
    }

    // Extract image URLs or paths from the uploaded files
    const images = req.files?.postImages ? req.files.postImages.map(file => file.path) : [];

    // Create a new idea instance
    const idea = new Idea({
        title,
        description,
        tags,
        images,
        owner: req.user
    });

    // Save the new idea to the database
    const savedIdea = await idea.save();

    // Send a success response
    res.status(201).json(new ApiResponse(201, savedIdea, "Idea added successfully"));
});


const getIdea = asyncHandler(async (req, res, next) => {
    const data = await Idea.find();

    res.status(201).json(new ApiResponse(201, data, "Data Retrieved"));
})

const updateIdea = asyncHandler(async (req, res, next) => {
    const { id } = req.params; // Assuming the idea ID is passed as a URL parameter
    const { title, description, tags } = req.body;

    // Retrieve the idea to update
    let idea = await Idea.findById(id);

    if (!idea) {
        return res.status(404).json(new ApiResponse(404, "Idea not found"));
    }

    // Update fields if they are provided in the request
    if (title) idea.title = title;
    if (description) idea.description = description;
    if (tags) idea.tags = tags;

    // Update images if new images are uploaded
    if (req.files && req.files.postImages) {
        const newImages = req.files.postImages.map(file => file.path);
        idea.images = idea.images.concat(newImages); // Append new images to existing ones
    }

    // Save the updated idea in the database
    const updatedIdea = await idea.save();

    // Send a success response with the updated idea
    res.status(200).json(new ApiResponse(200, "Idea updated successfully", updatedIdea));
})

const deleteIdea = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    // Find the idea by ID and delete it
    const idea = await Idea.findByIdAndDelete(id);

    // If the idea doesn't exist, return a 404 error
    if (!idea) {
        return res.status(404).json(new ApiResponse(404, "Idea not found"));
    }

    // Send a success response
    res.status(200).json(new ApiResponse(200, "Idea deleted successfully"));
})
export { addIdea, getIdea, updateIdea, deleteIdea };