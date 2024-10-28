import express,{json} from 'express'; //import express module
import { adminRoute } from './Routes/adminRoute.js';

const app=express();
app.use(json());

app.use('/',adminRoute)
const port=3000;



app.listen(port,()=>{ //2 parameters 1.port address. 2.function 
    console.log(`Server is listening to port ${port}`);
})