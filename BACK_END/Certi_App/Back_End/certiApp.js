import express,{json} from 'express';
import { userRoute } from './UserRouter/userRouter.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const certiApp = express()
certiApp.use(json());
certiApp.use(cors({
    origin:'http://127.0.0.1:5501',
    credentials:true
}))
certiApp.use(cookieParser());
certiApp.use('/',userRoute);

const port=8000;

certiApp.listen(port,()=>{
    console.log(`Server is listening ${port}`);
})
