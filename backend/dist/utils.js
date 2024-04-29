import mongoose from "mongoose";
export const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb://localhost:27017", {
            dbName: 'geminiClone'
        });
        console.log(`database connect succesfuly : ${conn.connection.host}`);
    }
    catch (error) {
        console.log(`database connection error : ${error.message}`);
    }
};
