import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import {usePostCreatorCourseMutation } from '@/features/api/courseApi';
import { nanoid } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

const catogoryskills = [
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
    { id: nanoid(), name: "Dockor" },
    { id: nanoid(), name: "Software Engineer" },
    { id: nanoid(), name: "Interview" },
    { id: nanoid(), name: "Next.Js Development" },
    { id: nanoid(), name: "Nest.js Development" },
    { id: nanoid(), name: "Git/Github" },
    { id: nanoid(), name: "Software Tools" },
    { id: nanoid(), name: "Video Editing" },
    { id: nanoid(), name: "Programming With DSA" },
    { id: nanoid(), name: "Core Subjects" },
]

const AddCourse = () => {
    const navigate = useNavigate();
    const [courseData, setCourseData] = useState({
        title: "",
        category: "",
    })
    const [postCreatorCourse,{data,isLoading,isSuccess,isError,}] = usePostCreatorCourseMutation();
    const changeCourseData = async (e) => {
        const { name, value } = e.target;
        setCourseData({ ...courseData, [name]: value });
    }
    const createCoursehandle = async () => {
        await postCreatorCourse(courseData);
    }
    useEffect(()=>{
        if(isSuccess || data){
            toast.success(data.message || "Created Successfylly")
            navigate('/admin/course')
        }
        if(isError){
            toast.error(isError?.data?.message || "Create Course Error")
        }
    },[data, isError, isSuccess, navigate])
     
    if(isLoading) <h1>Loading..</h1>
    
    return (
        <section>
            <main className='border px-1 md:px-12 py-7'>
                <div className='border shadow-accent px-12 py-3 rounded-2xl'>
                    <div className="mb-2 text-center sm:text-left">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                            Create a New Course
                        </h1>
                        <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-2xl">
                            Welcome to creating a new course. Some basic details are required.
                            More features coming soon.
                        </p>
                    </div>
                    <form action="" className='space-y-1'>
                        <div className='flex flex-col'>
                            <label htmlFor="title" className='font-bold'>Title<span className='text-red-600'>*</span></label>
                            <Input type="text" name="title" value={courseData.title} onChange={changeCourseData} placeholder="Your Course Name:" className="md:w-115 max-w-88" />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="category" className='font-medium'>Category<span className='text-red-600'>*</span></label>
                            <Select value={courseData.category} onValueChange={(value) => setCourseData({ ...courseData, category: value })}>
                                <SelectTrigger className="w-fit md:min-w-88">
                                    <SelectValue placeholder="Select a Category" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Category</SelectLabel>
                                        {catogoryskills?.map((data) => (
                                            <SelectItem
                                                key={data.id}
                                                value={data.name}
                                                className="cursor-pointer">
                                                {data.name}
                                            </SelectItem>
                                        ))}

                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </form>
                    <div className='flex flex-row gap-2 mt-3'>
                        <Button variant='outline' onClick={()=>navigate('/admin/course')} className="px-10 border hover:border-amber-400">Back</Button>
                        <Button onClick={createCoursehandle} className="px-10">
                            {
                                isLoading ? "Please Wait" : "Create"
                            }
                        </Button>
                    </div>
                </div>
            </main>
        </section>
    );
}

export default AddCourse;
