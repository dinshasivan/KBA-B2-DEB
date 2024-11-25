import jwt from "jsonwebtoken";


const secretKey='hello'
const authenticate=(req,res,next)=>{ 
    const cookies= req.headers.cookie;
    
    const cookie=cookies.split(';');
    for(let cooki of cookie){
        const [name,token]= cooki.trim().split('=');
        console.log(name,token);
        
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