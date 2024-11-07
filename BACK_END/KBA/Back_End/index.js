
import express,{json} from 'express'; //import express module

import { adminRoute } from './Routes/adminRoute.js';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();
const app=express();
app.use(cors({
    origin:'http://127.0.0.1:5500',//spesify the port 'http://127.0.0.1:5000'
    credentials:true
}));
app.use(json());
app.use(cookieParser());
app.use('/',adminRoute)
const port=process.env.Port;



app.listen(port,()=>{ //2 parameters 1.port address. 2.function 
    console.log(`Server is listening to port ${port}`);
})


