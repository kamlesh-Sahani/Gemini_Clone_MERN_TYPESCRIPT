import mongoose from 'mongoose';

const schema= new mongoose.Schema({
    heading:{
        type:String,
        required:[true,"Enter the Heading"]
    },
    data:{
        type:String,
        required:[true,"please Eneter the Data"]
    },
    user:{
        type:String,
        required:true
    }
},{
    timestamps:true
}
)


export const Result = mongoose.model('Result',schema)