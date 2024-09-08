import mongoose from "mongoose";
export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DATABASE_URL!,{dbName:"gemini-clone"})
        console.log(`database connect succesfuly : ${conn.connection.host}`);
    }
    catch (error:any) {
        console.log(`database connection error : ${error.message}`);
    }
};
