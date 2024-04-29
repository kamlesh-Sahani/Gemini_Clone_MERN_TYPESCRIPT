import mongoose from "mongoose";
export const connectDB = async()=>{
 try {
    const conn = await mongoose.connect("mongodb+srv://kamleshbca2005:geminiClone@cluster0.vtdulpi.mongodb.net/geminiClone?retryWrites=true&w=majority")
    console.log(`database connect succesfuly : ${conn.connection.host}`)
 } catch (error:any) {
    console.log(`database connection error : ${error.message}`);
 }   
}