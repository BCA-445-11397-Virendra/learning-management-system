import Loader from '@/components/custom/Loader';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useGetCreatorCourseQuery } from '@/features/api/courseApi';
import { Edit } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router';

const CourseTable = () => {
    const navigate = useNavigate();
    const { data:courses, isLoading } = useGetCreatorCourseQuery();
    
    if(isLoading){
        <>
          <Loader/>
        </>
    }
    return (
        <section className='h-fit'>
            <main className='border px-1 md:px-12 py-7'>
                <div>
                    <Button onClick={() => navigate('create')}>Create New Course</Button>
                </div>
                <div className='mt-6 font-medium'>
                    <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
                        <table className="w-full text-sm text-left rtl:text-right text-body">
                            <thead className="text-sm text-body bg-neutral-secondary-medium border-b border-default-medium">
                                <tr className='bg-[#1C2536] text-[#bcbcbcf9]'>
                                    <th scope="col" className="px-6 py-3 font-medium">
                                        Course Title
                                    </th>
                                    <th scope="col" className="px-6 py-3 font-medium">
                                        Category
                                    </th>
                                    <th scope="col" className="px-6 py-3 font-medium">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3 font-medium">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-3 font-medium">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            {
                                courses?.course.map((course) => (
                                    <tbody key={course?._id}>
                                        <tr className="bg-neutral-primary-soft border-b  border-default">
                                            <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                                {course?.title}
                                            </th>
                                            <td className="px-6 py-4">
                                                {course?.category}
                                            </td>
                                            <td className="px-6 py-4">
                                                <Badge variant={course?.isPublished ? "secondary" :"destructive"}>{course?.isPublished ? "Public":"Private"}</Badge>
                                            </td>
                                            <td className="px-6 py-4">
                                                ${course?.price}
                                            </td>
                                            <td className="px-6 py-4">
                                                <Button variant='outline' onClick = {()=>navigate(`${course?._id}`)}>
                                                   <Edit/>
                                                </Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                ))
                            }
                        </table>
                    </div>
                </div>
            </main>
        </section>
    );
}

export default CourseTable;
