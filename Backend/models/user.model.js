import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
            select: false,
        },

        role: {
            type: String,
            enum: ["student", "instructor", "admin"],
            default: "student",
        },
        profileUrl: {
            type: String,
            default: "",
        },
        phoneNumber:{
            type:String,
            default:"000000000"
        },
        goals:{
            type:String,
            default:"Software Engineer"
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        location:{
           type:String,
           defatul:"India"
        },
        enrolledCourses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Course",
            },
        ],
        createdCourses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Course",
            },
        ],

        resetPasswordToken: String,
        resetPasswordExpire: Date,
    },
    {
        timestamps: true,
    },
);

const User = mongoose.model("User", userSchema);

export default User;
