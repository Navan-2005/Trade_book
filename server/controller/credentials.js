import { prisma } from "db";
import jwt from "jsonwebtoken";
import { log } from "node:console";

const generateToken = (user) => {
    // Implement your token generation logic here (e.g., using JWT)
    // For example:
    // return jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
}
const signup= async(req,res)=>{
    const {email,username,password}=req.body;
    try{
        const user = await prisma.credentials.create({
            data:{
                email,
                username,
                password
            }
        });

        const token = generateToken(user);
        res.status(200).json({user,token});
    }catch(error){
        res.status(400).json('Error in signing up : ',error);
    }
}

const login = async(req,res)=>{
    try {
         const {email,password}=req.body;   
         console.log('credentials : ',email,password);
         
        const user = await prisma.credentials.findUnique({
            where:{
                email:email
            }
        })
        
        if(!user){
            return res.status(400).json({message:"User not found"});
        }

        if(user.password !== password){
            return res.status(400).json({message:"Invalid password"});
        }

        const token = generateToken(user);
        res.status(200).json({user,token});
    } catch (error) {
        console.log(error);
        res.status(400).json('Error in logging in : ',error);
    }
}

export {signup,login};