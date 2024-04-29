import mongoose from 'mongoose';

const schema= new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Enter the Email"]
    },
    uid:{
        type:String,
        required:[true,"please Eneter the Uid"]
    },
    name:{
        type:String,
        required:[true,"please Eneter the Name"]
    },
    photo:{
        type:String,
        required:[true,"please Eneter the photo"]
    }
},{
    timestamps:true
}
)


export const User = mongoose.model('User',schema)