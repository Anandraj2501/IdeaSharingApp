import asyncHandler from "../utils/asyncHandler.js"
import { upload } from "../middlewares/multer.middlewares.js";
import { APiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import uploadOnCloudinary from "../utils/cloudinary.js";


const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        console.log(userId);
        const user = await User.findById(userId)
        console.log(user);
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshtoken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new APiError(500, "Something went wrong while generating referesh and access token")
    }
}


const registerUser = asyncHandler(async (req, res) => {

    const { username, email, password, isAdmin } = req.body

    if (!username || !email || !password) {
        throw new APiError(400, "All fields are required");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
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
        isAdmin: isAdmin || false
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

const loginUser = asyncHandler(async (req, res, next) => {
    const {email, password} = req.body;

    if(!email || !password){
        throw new APiError(400,"Email or Password is missing");
    }

    const user = await User.findOne({email});

    if(!user){
        throw new APiError(404,"User with email do not exists");
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if(!isPasswordCorrect){
        throw new APiError(401,"Password is incorrect");
    }

    const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshtoken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )
})
export { registerUser, loginUser }