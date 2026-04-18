import mongoose from "mongoose";
export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Mongodb Connected Successfully")
    } catch (error) {
       console.log("Mongodb Server Error",error)
    }
}