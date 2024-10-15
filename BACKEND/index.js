//express is a library for backend programming
import express from 'express'; //import express module

const app=express();
const port=8001;
app.listen(port,()=>{ //2 paramers 1.port address. 2.function 
    console.log(`Server is listening to port ${port}`);
})
