import React, { useEffect } from "react";
import { Button } from "../ui/button";

import { useParams } from "react-router";
import { toast } from "sonner";
import { useCreateChackoutSessionMutation } from "@/features/api/purchaseApi";


const BuyCourse = () => {
  const { courseId } = useParams();
  const [createChackoutSession, { data, isLoading , isSuccess , isError }] =
    useCreateChackoutSessionMutation();

  const purchaseCourseHandle = async () => {
    await createChackoutSession(courseId);
  };
  useEffect(()=>{
    if(isSuccess){
      if(data?.url){
         window.location.href = data?.url;
      }else {
         toast.error("Invalide Response")
      }
    }
    if(isError){
      toast.error(isError?.data.message || "Failed to Create Cheakout")
    }
    
  },[data?.url, isError, isSuccess])
  return (
    <div>
      <Button disabled={isLoading} onClick={purchaseCourseHandle} className="w-full">
        {
          isLoading ? "Please Wait" : "Buy Course"
        }
      </Button>
    </div>
  );
};

export default BuyCourse;
