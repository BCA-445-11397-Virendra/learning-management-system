import mongoose from "mongoose";
const coursePurchageSchema = new mongoose.Schema({
    courseId : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course',
        required:true
    },
    userId : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:["panding","rejected","completed"],
        default:"panding"
    },
    paymentId:{
        type:String,
        required:true
    }
},{timestamps:true})

export const CoursePurchage = mongoose.model("CoursePurchage",coursePurchageSchema)