import bcrypt from "bcrypt";
import UserModel from "../models/userModel.js";
import generatedAccessToken from "../utils/generateAccessToken.js";
import genertedRefreshToken from "../utils/generateRefreshToken.js";
import uploadImageClodinary from "../utils/uploadImageCloudinary.js";
import jwt from 'jsonwebtoken';


export async function registerUser(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Provide email, name, and password",
                error: true,
                success: false,
            });
        }

        const user = await UserModel.findOne({ email });

        if (user) {
            return res.json({
                message: "Email already registered",
                error: true,
                success: false,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        return res.status(201).json({
            message: "User registered successfully",
            error: false,
            success: true,
            data:newUser
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Internal server error",
        });
    }
}


export async function loginController(request,response){
    try {
        const { email , password } = request.body


        if(!email || !password){
            return response.status(400).json({
                message : "provide email, password",
                error : true,
                success : false
            })
        }

        const user = await UserModel.findOne({ email })

        if(!user){
            return response.status(400).json({
                message : "User not register",
                error : true,
                success : false
            })
        }

        const checkPassword = await bcrypt.compare(password,user.password)

        if(!checkPassword){
            return response.status(400).json({
                message : "Check your password",
                error : true,
                success : false
            })
        }

        const accessToken = await generatedAccessToken(user._id)
        const refreshToken = await genertedRefreshToken(user._id)

        const updateUser = await UserModel.findByIdAndUpdate(user?._id,{
            last_login_date : new Date()
        })

        // const cookiesOption = {
        //     httpOnly : true,
        //     secure : true,
        //     sameSite : "None"
        // }
        response.cookie('accessToken',accessToken,{
            httpOnly:true
        })
        response.cookie('refreshToken',refreshToken,{
            httpOnly:true
        })

        // console.log(accesstoken);
        

        return response.json({
            message : "Login successfully",
            error : false,
            success : true,
            data : {
                accessToken,
                refreshToken
            }
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

//logout
export async function logoutController(req, res) {
    try{
     const cookiesOption ={
         httpOnly :true,
         secure:true,
         sameSite :"None"
     }
 
     res.clearCookie("accessToken",cookiesOption)
     res.clearCookie("refreshToken",cookiesOption)
 
     return res.json({
         message:"Logout successfully",
         error :false,
         success:true
     })
 
    }catch(error){
     console.log(error);
     
     
    }
 }



 export async  function uploadAvatar(request,response){
    try {
        const userId = request.userId
        const image = request.file  // multer middleware

        const upload = await uploadImageClodinary(image)
        
        // console.log('image',image);
        const updateUser = await UserModel.findByIdAndUpdate(userId,{
            avatar : upload.url
        })

        return response.json({
            message : "upload profile",
            success : true,
            error : false,
            data : {
                _id : userId,
                avatar : upload.url
            }
        })
   
        
       
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export async function updateUserDetails(request,response){
    try {
        const userId = request.userId //auth middleware
        const { name, email, mobile } = request.body 

        const updateUser = await UserModel.updateOne({ _id : userId},{
            ...(name && { name : name }),
            ...(email && { email : email }),
            ...(mobile && { mobile : mobile })
            
        })

        return response.json({
            message : "Updated successfully",
            error : false,
            success : true,
            data : updateUser
        })


    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export async function refreshToken(request,response){
    try {
        const refreshToken = request.cookies.refreshToken || request?.headers?.authorization?.split(" ")[1]  /// [ Bearer token]

        if(!refreshToken){
            return response.status(401).json({
                message : "Invalid token",
                error  : true,
                success : false
            })
        }

        console.log('refreshtoken',refreshToken);
        

        const verifyToken = await jwt.verify(refreshToken,process.env.SECRET_KEY_REFRESH_TOKEN)

        if(!verifyToken){
            return response.status(401).json({
                message : "token is expired",
                error : true,
                success : false
            })
        }
        console.log('verifytoken',verifyToken);
        
        const userId = verifyToken?._id

        const newAccessToken = await generatedAccessToken(userId)

        response.cookie('accessToken',newAccessToken,{
            httpOnly:true
        })

        return response.json({
            message : "New Access token generated",
            error : false,
            success : true,
            data : {
                accessToken : newAccessToken
            }
        })


    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}




