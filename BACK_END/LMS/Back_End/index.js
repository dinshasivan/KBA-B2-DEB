import express,{json} from 'express'; //import express module
import { adminRoute } from './Routes/adminRoute.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app=express();
app.use(json());
app.use(cors({
    origin:'http://127.0.0.1:5501',
    credentials:true
}));
app.use(cookieParser());

app.use('/',adminRoute)
const port=3000;



app.listen(port,()=>{ //2 parameters 1.port address. 2.function 
    console.log(`Server is listening to port ${port}`);
})