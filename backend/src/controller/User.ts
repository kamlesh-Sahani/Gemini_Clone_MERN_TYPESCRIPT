import { Request, Response } from "express";
import { User } from "../models/User.js";

// register
export const newUser = async (req: Request, res: Response) => {
  try {
    const { email, uid,photo,name } = req.body;
    const isExist = await  User.findOne({uid});
    if(isExist){
      return res.status(400).json({
        success:false,
        message:"user is already exist "
      })
    }
    const user = await User.create({
      email,
      uid,
      photo,
      name
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        messgae: "faild to register",
      });
    }

    res.status(201).json({
        success:true,
        user,
        message:"register successfuly"
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// login user
export const getUser = async(req:Request,res:Response)=>{
    try {
        const {email,uid }= req.body;
        const user = await User.findOne({email,uid});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"email or uid is wrong"
            })
        }
        return res.status(200).json({
            success:true,
            message:"login is successful",
            user
        })

    } catch (error:any) {
        res.status(500).json({
            success: false,
            message: error.message,
          });
    }
}


export const isExist = async (req:Request,res:Response)=>{
  try {
    const {uid}=req.body;
    const user = await User.findOne({uid});
    if(!user){
      return res.status(400).json({
        success:false,
        message:"user is not exist "
      })
    }
    return res.json({
      success:true,
      message:"user is found",
      user
    })
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}