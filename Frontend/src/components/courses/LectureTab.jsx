import React, { useEffect } from 'react';
import { Button } from '../ui/button';
import { Edit } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { useGetCourseLectureQuery } from '@/features/api/courseApi';
import { toast } from 'sonner';

const LectureTab = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { data, isSuccess, isLoading, error, refetch } = useGetCourseLectureQuery(courseId);

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
    if (error) {
      toast.error(error?.data?.message)
    }
  }, [error, isSuccess, refetch])
  if (isLoading) {
    <h1>Loading...</h1>
  }
  return (
    <section>
      {
        error ? (<p>Failed to Load Lectures</p>) : data?.lectures?.length === 0 ? (<p>No Lectures Available</p>) : (
          data?.lectures?.map((lecture, index) => (
            <div className='flex justify-between items-center border px-2 py-2' key={lecture._id}>
              <h1 className='font-medium'><span>Lecture {index+1}:</span> {lecture.lectureTitle}</h1>
              <Button variant='outline' onClick={() => navigate(`${lecture._id}`)} ><Edit className='text-blue-700' /></Button>
            </div>
          ))
        )
      }
    </section>
  );
}

export default LectureTab;
