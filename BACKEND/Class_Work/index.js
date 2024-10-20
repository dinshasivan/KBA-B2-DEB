//express is a library for backend programming
import express,{json} from 'express'; //import express module

import { adminRoute } from './Routes/admin.Routes.js';

const app=express();
app.use(json());

app.use('/',adminRoute)
const port=3002;



app.listen(port,()=>{ //2 parameters 1.port address. 2.function 
    console.log(`Server is listening to port ${port}`);
})


// app.get('/',(req,res)=>{
//     res.send("Hello world")
// })

// app.post('/signup',async(req,res)=>{
//     try{
//     // console.log("hello!");
    
//     const data=req.body;
    
//     const {FirstName,
//         LastName,
//         UserName,
//         Password,
//         Role}=data;
//         const newP = await bcrypt.hash(Password,10);
      
//         // console.log("Full Name:",FirstName,LastName);
//         // user.set(UserName,{FirstName,LastName,Password:newP,Role});
       
        
//        // res.status(201).send("Data saved")
//     //    res.status(201).json({message:"Data saved"});
//     //    console.log(user.has(UserName));
//     //    console.log(user.get(UserName));
       
       
//         if(user.has(UserName)){
//             console.log("User already registered!")
//             res.status(201).json({message:"User already registered!"});
//         }
//         else{
//             user.set(UserName,{FirstName,LastName,Password:newP,Role});
//             console.log("User successfully registered!")
//             res.status(201).json({message:"User Successfully registered!"});
//             console.log(user.get(UserName));
//             // res.status(201).json({message:"User successfully registered!"});
//         }
//     }
//     catch(error){
//         res.status(500).json(error);
//     }
    
       
//     })
   
