import mongoose from "mongoose";
import { Course } from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";
import {
  deleteMediaFromCloudinary,
  deleteVideoFromCloudinary,
  uploadMedia,
} from "../utils/cloudinary.js";

export const createCourse = async (req, res) => {
  try {
    const userId = req.id;
    const { title, category } = req.body;
    if (!title || !category) {
      return res.status(400).json({
        message: "Title and Category required!",
        success: false,
      });
    }
    const course = await Course.create({
      title,
      category,
      creator: userId,
    });
    return res.status(201).json({
      message: "Course Created Successfully",
      course,
      success: true,
    });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Course with same title already exists",
        success: false,
      });
    }
    return res.status(500).json({
      message: "Internal Create Course Error",
      success: false,
    });
  }
};

export const getCreatorCourse = async (req, res) => {
  try {
    const userId = req.id;
    if (!userId) {
      return res.status(400).json({
        message: "UserId Not Found",
        sucess: true,
      });
    }
    const course = await Course.find({ creator: userId });
    if (!course) {
      return res.status(400).json({
        message: "Course Not Found",
        success: false,
      });
    }
    return res.status(200).json({
      course,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Create Course Error",
      success: false,
    });
  }
};

export const editCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const { title, subTitle, description, category, level, price, language } =
      req.body || {};
    const thumbnails = req.file;
    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course Not Found",
        success: false,
      });
    }
    let courseThumbnails;
    if (thumbnails) {
      if (course.thumbnail) {
        const publicId = course.thumbnail.split("/").pop().split(".")[0];
        await deleteMediaFromCloudinary(publicId);
      }
      courseThumbnails = await uploadMedia(thumbnails.path);
    }
    const updateData = {
      title,
      subTitle,
      description,
      category,
      level,
      price,
      thumbnail: courseThumbnails?.secure_url,
      language,
    };

    course = await Course.findByIdAndUpdate(courseId, updateData, {
      new: true,
    });
    return res.status(200).json({
      message: "Course Update Successfully",
      course,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Edit Course Error",
      success: false,
    });
  }
};

export const getCouserById = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course Not Found",
        success: false,
      });
    }
    return res.status(200).json({
      course,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Get Course Error",
      success: false,
    });
  }
};

export const createLecture = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { lectureTitle } = req.body;
    if (!lectureTitle || !courseId) {
      return res.status(400).json({
        message: "Lecture Title is Required",
        success: false,
      });
    }
    const lecture = await Lecture.create({ lectureTitle });
    const course = await Course.findById(courseId);
    if (course) {
      course.lectures.push(lecture._id);
      await course.save();
    }
    return res.status(201).json({
      message: "Lecture Created Successfully",
      lecture,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Create Lecture Error",
      success: false,
    });
  }
};

export const getCourseLectures = async (req, res) => {
  try {
    const { courseId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({
        message: "Invalid Course ID",
        success: false,
      });
    }

    const course = await Course.findById(courseId).populate("lectures");

    if (!course) {
      return res.status(404).json({
        message: "Course Not Found",
        success: false,
      });
    }

    return res.status(200).json({
      lectures: course.lectures || [],
      success: true,
    });
  } catch (error) {
    console.error("GetCourseLectures Error:", error.message);
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const removeCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({
        message: "Invalid Course ID",
        success: false,
      });
    }
    const course =
      await Course.findByIdAndDelete(courseId).populate("lectures");

    if (!course) {
      return res.status(404).json({
        message: "Course Not Found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Course removed successfully",
      success: true,
    });
  } catch (error) {
    console.error("Remove Course Error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const updateLecture = async (req, res) => {
  try {
    const { lectureTitle, videoInfo, isPreviewFree } = req.body;
    const { courseId, lectureId } = req.params;
    if (!videoInfo) {
      return res.status(404).json({
        message: "Please Upload Video",
      });
    }
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture Not Found",
        success: false,
      });
    }

    if (typeof lectureTitle === "string" && lectureTitle.trim() !== "") {
      lecture.lectureTitle = lectureTitle.trim();
    }
    // Update fields safely
    if (lectureTitle !== undefined) {
      lecture.lectureTitle = lectureTitle;
    }
    if (videoInfo?.videoUrl) {
      lecture.videoUrl = videoInfo.videoUrl;
    }
    if (videoInfo?.publicId) {
      lecture.publicId = videoInfo.publicId;
    }
    if (typeof isPreviewFree === "boolean") {
      lecture.isPreviewFree = isPreviewFree;
    }
    if (isPreviewFree !== undefined) {
      lecture.isPreviewFree = isPreviewFree;
    }

    await lecture.save();
    const course = await Course.findById(courseId);
    if (!course && !course.lectures.includes(lecture._id)) {
      course.lectures.push(lecture._id);
      await course.save();
    }
    return res.status(200).json({
      message: "Lecture updated successfully",
      lecture,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Update Lecture Error",
      success: false,
    });
  }
};

export const removeLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findByIdAndDelete(lectureId);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture Not Found",
      });
    }
    // delete the lecture form cloudinaly
    if (lecture.publicId) {
      await deleteVideoFromCloudinary(lecture.publicId);
    }
    // Remove the Lecture referance from the associated course
    await Course.updateOne(
      { lectures: lectureId },
      { $pull: { lectures: lectureId } },
    );
    return res.status(200).json({
      message: "Lecture Remove Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Remove Lecture Error",
      success: false,
    });
  }
};

export const getLectureById = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture Not Found",
      });
    }
    return res.status(200).json({
      lecture,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Get Lecture Error",
      success: false,
    });
  }
};

export const togglePublishCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { publish } = req.query; // true,false
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course Not Found",
        success: false,
      });
    }
    //publishStatus based on the query parameters
    course.isPublished = publish === "true";
    await course.save();
    const statusMessage = course.isPublished ? "Publish" : "Private";
    return res.status(200).json({
      message: `Course is ${statusMessage}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Publish Course Error",
      success: false,
    });
  }
};

export const getPublishCourse = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true }).populate({
      path: "creator",
      select: "name photoUrl",
    });
    if (!courses) {
      return res.status(404).json({
        message: "Course Not Found",
        success: false,
      });
    }
    return res.status(200).json({
      courses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Get Publish Course Error",
      success: false,
    });
  }
};

export const getCourseDetailsbyId = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).populate({
      path: "creator",
      select: "name",
    });
    if (!course) {
      return res.status(404).json({
        message: "Single Course Not Found",
        success: false,
      });
    }
    return res.status(200).json({
      course,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Get Publish Course Error",
      success: false,
    });
  }
};


export const searchCourse = async (req, res) => {
  try {
    let { query = "", categories = [], sortByPrice = "" } = req.query;
    if (typeof categories === "string") {
      categories = categories.split(",");
    }

    const searchCriteria = {
      isPublished: true,
      $and: [
        {
          $or: [
            { title: { $regex: query, $options: "i" } },
            { subTitle: { $regex: query, $options: "i" } },
            { category: { $regex: query, $options: "i" } },
          ],
        },
      ],
    };

    if (categories.length > 0) {
      searchCriteria.$and.push({
        category: { $in: categories },
      });
    }

    const sortOptions = {};
    if (sortByPrice === "low") sortOptions.price = 1;
    else if (sortByPrice === "high") sortOptions.price = -1;
    
    const courses = await Course.find(searchCriteria)
      .populate({ path: "creator", select: "name photoUrl" })
      .sort(sortOptions);

    return res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};