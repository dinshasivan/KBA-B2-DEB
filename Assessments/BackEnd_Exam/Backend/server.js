import express, { json } from 'express';
import { route } from './Routes/route.js';

const app = express();

const port = 3001;

app.use(json());

app.use('/',route);
app.listen(port, ()=>{
    console.log(`Server listening port ${port}`);
    
})