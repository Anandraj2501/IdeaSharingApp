import asyncHandler from "../utils/asyncHandler.js"
import {upload} from "../middlewares/multer.middlewares.js";
import { APiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

const registerUser = asyncHandler(async(req,res)=>{

    const {username, email, password, isAdmin} = req.body

    if(!username || !email || !password){
        throw new APiError(400, "All fields are required");
    }

    const existingUser = await User.findOne({email});
    if(existingUser){
        throw new APiError(400, "User with email already exists");
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    //const coverImageLocalPath = req.files?.coverImage[0]?.path;

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }
    

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
   

    const user = await User.create({
        avatar: avatar?.url || "",
        coverimage: coverImage?.url || "",
        email, 
        password,
        username: username.toLowerCase(),
        isAdmin : isAdmin || false
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshtoken"
    )

    if (!createdUser) {
        throw new APiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )  

})
export { registerUser }