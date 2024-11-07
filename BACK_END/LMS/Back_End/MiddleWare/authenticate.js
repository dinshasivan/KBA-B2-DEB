import jwt from "jsonwebtoken";
import dotenv from 'dotenv';


dotenv.config();
const secretKey='hello';
const authenticate=(req,res,next)=>{ 
    const cookies= req.headers.cookie;
    // req.cookies
    // console.log(cookies);
    
    const cookie=cookies.split(';');
    for(let cooki of cookie){
        const [name,token]= cooki.trim().split('=');

        if(name=='authToken'){
            const verified= jwt.verify(token,secretKey);
            req.UserName=verified.UserName;
            req.UserRole=verified.UserRole;
            break;
        }
    }
    next();
}
export {authenticate};