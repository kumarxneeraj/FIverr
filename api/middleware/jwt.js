import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";


export const verifyToken=(req,res,next)=>{
    const token =req.cookies.accessToken;

    if(!token)return next(createError(401,"You are not authenticated"));//if dont have token 
    //but if we have token we have to check user id inside this token using JWT 
    
    jwt.verify(token ,process.env.JWT_KEY,async (err,payload)=>{
       if(err)
        return next(createError(403,"Token is not valid"));
       
        req.userId=payload.id;
        req.isSeller=payload.isSeller;
        next() // we are calling next function here as after verifying user token we have to call next function which is deleteUser  router.delete("/:id",verifyToken ,deleteUser); see this in user.route if we dont call next then after verifying it will stop
    });


}