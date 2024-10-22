//express is a library for backend programming
import express,{json} from 'express'; //import express module

import { adminRoute } from './Routes/admin.Routes.js';
import dotenv from 'dotenv';

dotenv.config();
const app=express();
app.use(json());

app.use('/',adminRoute)
const port=process.env.Port;



app.listen(port,()=>{ //2 parameters 1.port address. 2.function 
    console.log(`Server is listening to port ${port}`);
})


