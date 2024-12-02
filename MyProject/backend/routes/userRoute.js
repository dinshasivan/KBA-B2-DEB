import { Router } from "express";
import { loginController, logoutController, refreshToken, registerUser, updateUserDetails, uploadAvatar } from "../controllers/userController.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";


const userRouter = Router();

userRouter.post('/register',registerUser);
userRouter.post('/login',loginController);
userRouter.get('/logout',auth,logoutController)
userRouter.put('/upload-avatar',auth,upload.single('avatar'),uploadAvatar)
userRouter.put('/update-user',auth,updateUserDetails);
userRouter.post('/refresh-token',refreshToken)

export default userRouter;