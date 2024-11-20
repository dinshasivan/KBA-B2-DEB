import express, { json } from 'express';
import { adminRoute } from './Routes/adminRoute.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express();

app.use(json());
app.use(cors({
    origin:'http://127.0.0.1:5500',
    credentials:true
}));
app.use(cookieParser());
app.use('/',adminRoute);

const port = 3001;

app.listen(port, ()=>{
    console.log(`Server listening  to port ${port}`);
    
})