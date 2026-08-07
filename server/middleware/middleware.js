import jwt from "jsonwebtoken";
import { prisma } from "db";

const auth_user= async(req,res,next)=>{
    const token =req.cookies.token || req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET);

    const user = await prisma.credentials.findUnique({
        where:{
            email:decoded.email
        }
    })

    if(!user){
        return res.status(401).json({message:"Unauthorized"});
    }

    req.user = user;

    next();
}

export {auth_user};