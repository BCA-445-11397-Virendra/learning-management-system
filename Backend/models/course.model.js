import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
    },
    subTitle: {
      type: String,
    },
    description: {
      type: String,
    },
    slug: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
    },
    category: {
      type: String,
      required: true,
      index: true,
    },
    goals: {
      type: String,
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },

    language: {
      type: String,
      default: "English",
    },
    price: {
      type: Number,
      default: 0,
    },
    
    thumbnail: {
      type: String
    },

    discountPrice: {
      type: Number,
      default: 0,
    },

    lectures: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lecture",
      },
    ],

    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    enrolledStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    totalDuration: {
      type: String,
      default: "0h",
    },

    totalLectures: {
      type: Number,
      default: 0,
    },
    resourse:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Lecture"
    },
    rating: {
      type: Number,
      default: 0,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);


courseSchema.pre("save", async function () {
  // If slug already exists and title not changed, skip
  if (this.slug && !this.isModified("title")) return;

  const baseSlug = this.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  let slug = baseSlug;
  let count = 1;

  const Course = mongoose.model("Course");

  while (await Course.exists({ slug })) {
    slug = `${baseSlug}-${count}`;
    count++;
  }

  this.slug = slug;
});




export const Course = mongoose.model("Course", courseSchema);


