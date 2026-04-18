import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { nanoid } from "@reduxjs/toolkit";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { useNavigate, useParams } from "react-router";
import { useEditCourseMutation, useGetCouseByidQuery, usePublishCourseMutation, useRemoveCourseMutation } from "@/features/api/courseApi";
import { toast } from "sonner";
import Loader from "../custom/Loader";

const categorySkills = [
  { id: nanoid(), name: "App Development" },
  { id: nanoid(), name: "Web Development" },
  { id: nanoid(), name: "Game Development" },
  { id: nanoid(), name: "Full Stack Development" },
  { id: nanoid(), name: "Frontend Development" },
  { id: nanoid(), name: "Backend Development" },
  { id: nanoid(), name: "Java Full Development" },
  { id: nanoid(), name: "Data Science" },
  { id: nanoid(), name: "AI & Machine Learning" },
  { id: nanoid(), name: "Cyber Security" },
  { id: nanoid(), name: "UI / UX Design" },
  { id: nanoid(), name: "Cloud & DevOps" },
  { id: nanoid(), name: "AWS" },
  { id: nanoid(), name: "Docker" },
  { id: nanoid(), name: "Software Engineer" },
  { id: nanoid(), name: "Interview" },
  { id: nanoid(), name: "Next.js Development" },
  { id: nanoid(), name: "Nest.js Development" },
  { id: nanoid(), name: "Git/Github" },
  { id: nanoid(), name: "Software Tools" },
  { id: nanoid(), name: "Video Editing" },
  { id: nanoid(), name: "Programming With DSA" },
  { id: nanoid(), name: "Core Subjects" },
];

const CourseUpdateTab = () => {
  const navigate = useNavigate();
  const params = useParams();
  const courseId = params.courseId;
  const { data: getCourseByIdData, isLoading: getCourseByIdIsLoading, refetch } = useGetCouseByidQuery(courseId);
  const courses = getCourseByIdData?.course
  const [editCourse, { data, isSuccess, isLoading, error }] = useEditCourseMutation();
  const [removeCourse, { data: removeCourseData, isSuccess: removeIsSuccess, error: removeError }] = useRemoveCourseMutation();
  const [input, setInput] = useState({
    title: "",
    subTitle: "",
    description: "",
    category: "",
    level: "",
    price: "",
    thumbnail: "",
    language: "",
  });
  const [previewThumbnail, setPreviewThumbnail] = useState("");

  useEffect(() => {
    if (courses) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setInput({
        title: courses.title,
        subTitle: courses.subTitle,
        description: courses.description,
        category: courses.category,
        level: courses.level,
        price: courses.price,
        language: courses.language,
      });
      refetch()
    }
  }, [courses, refetch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };
  const handleSelectChange = (field, value) => {
    setInput((prev) => ({ ...prev, [field]: value }));
  };
  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, thumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };


  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", input.title);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("level", input.level);
    formData.append("price", input.price);
    if (input.thumbnail) {
      formData.append("thumbnail", input.thumbnail);
    }
    formData.append("language", input.language);
    await editCourse({ formData, courseId });
  };

  const removeCourseHandle = async () => {
    await removeCourse(courseId);
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message)
      navigate('/admin/course');
    }
    if (error) {
      toast.error(error?.data?.message || "Edit Course Error")
    }
  }, [data, error, isSuccess, navigate])
  useEffect(() => {
    if (removeIsSuccess) {
      toast.success(removeCourseData?.message);
      navigate('/admin/course')
    }
    if (removeError) {
      toast.error(error?.removeCourseData?.message)
    }
  }, [removeCourseData, error, removeIsSuccess, navigate, removeError])

  if (getCourseByIdIsLoading) {
    <>
      <Loader />
    </>
  }

  // eslint-disable-next-line no-empty-pattern
  const [publishCourse, { }] = usePublishCourseMutation();
  const publishStatusHandle = async (action) => {
    try {
      const response = await publishCourse({ courseId, query: action });
      if (response.data) {
        refetch();
        toast.success(response?.data.message);
        navigate('/admin/course');
      }
    } catch (error) {
      toast.error("Failed to Publish and Private Course", error);
    }
  }

  return (
    <div className="border rounded px-4 py-4 mt-4 overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-3">
        <div>
          <h1 className="font-bold md:text-2xl text-[#0004f5]">
            Basic Course Information
          </h1>
          <p className="font-medium">
            Make changes to your course here. Click save when you’re done.
          </p>
        </div>
        <div className="flex gap-4">
          <Button className="px-8" onClick={removeCourseHandle}>Remove</Button>
          <Button disabled={courses?.lectures.length === 0} variant="outline" onClick={() => publishStatusHandle(getCourseByIdData?.course.
            isPublished ? "false" : "true")} className="px-8">
            {courses?.isPublished ? "Publish" : "Private"}
          </Button>
        </div>
      </div>

      {/* Form */}
      <form className="mt-6 space-y-4">
        {/* Title */}
        <div>
          <label className="font-medium">Title</label>
          <Input
            name="title"
            value={input?.title}
            onChange={handleInputChange}
            placeholder="Ex. Full Stack Developer"
          />
        </div>

        {/* Subtitle */}
        <div>
          <label className="font-medium">Sub Title</label>
          <Input
            name="subTitle"
            value={input?.subTitle}
            onChange={handleInputChange}
            placeholder="Course subtitle"
          />
        </div>

        {/* Description */}
        <div>
          <label className="font-medium">Description</label>
          <textarea
            name="description"
            value={input?.description}
            onChange={handleInputChange}
            rows={5}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div>
            <label className="font-medium">Category</label>
            <Select
              value={input?.category}
              onValueChange={(value) => handleSelectChange("category", value)}
            >
              <SelectTrigger className=" w-full md:w-96">
                <SelectValue placeholder="Select a Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  {categorySkills.map((item) => (
                    <SelectItem key={item?.id} value={item?.name}>
                      {item?.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="font-medium">Course Level</label>
            <Select
              value={input?.level}
              onValueChange={(value) => handleSelectChange("level", value)}
            >
              <SelectTrigger className="w-full md:w-96">
                <SelectValue placeholder="Select Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Level</SelectLabel>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="font-medium">Course Language</label>
            <Select
              value={input?.language}
              onValueChange={(value) => handleSelectChange("language", value)}
            >
              <SelectTrigger className="w-full md:w-96">
                <SelectValue placeholder="Select Languages" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Languages</SelectLabel>
                  <SelectItem value="Hindi">Hindi</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Hindlish">Hinglish</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 space-y-2">
          <div className="space-y-2">
            <Label>Course Thumbnail:</Label>
            <Input
              type="file"
              name="thumbnails"
              accept="image/*"
              className="w-full md:w-96"
              onChange={selectThumbnail}
            />
            {previewThumbnail && (
              <img
                src={previewThumbnail}
                className="w-60 rounded border"
                alt=""
              />
            )}
          </div>
          <div className="space-y-2">
            <Label className="font-medium">Course Price:(INR)</Label>
            <Input
              type="number"
              name="price"
              className="w-full md:w-96"
              value={input?.price}
              onChange={handleInputChange}
              placeholder="Enter a Course Price"
            />
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            className="px-10"
            type="button"
            variant="outline"
            onClick={() => navigate("/admin/course")}
          >
            Back
          </Button>
          <Button type="submit" onClick={handleSubmitUpdate} className="px-10">
            {isLoading ? "Please Wait" : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CourseUpdateTab;
