import express,{json} from 'express';
import { userRoute } from './UserRouter/userRouter.js';

const certiApp = express()
certiApp.use(json());

certiApp.use('/',userRoute);

const port=8000;

certiApp.listen(port,()=>{
    console.log(`Server is listening ${port}`);
})
