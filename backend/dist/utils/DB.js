import mongoose from "mongoose";
export const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://kamleshbca2005:lms@cluster0.vtdulpi.mongodb.net",{dbName:"gemini-clone"})
        console.log(`database connect succesfuly : ${conn.connection.host}`);
    }
    catch (error) {
        console.log(`database connection error : ${error.message}`);
    }
};
