import React from 'react';
import GoalSearchInput from '../courses/GoalSearchInput';
const examGoals = [
    { value: "upsc", label: "UPSC Civil Services" },
    { value: "gate", label: "GATE" },
    { value: "ssc", label: "SSC Exams" },
    { value: "banking", label: "Banking Exams" },
    { value: "railway", label: "Railway Exams" },
    { value: "nda", label: "NDA" },
    { value: "neet", label: "NEET UG" },
    { value: "jee", label: "IIT JEE" },
    { value: "cat", label: "CAT" },
    { value: "cuet", label: "CUET" },
];
const GoadSkills = () => {
    return (
        <section className='border space-y-1'>
            <div className='px-4 '>
                <div className='flex flex-col gap-2'>
                    <div>
                        <h1 className='text-2xl md:text-3xl font-bold text-[#3c4852] '>Select your goal / exam</h1>
                        <p className='text-[18px] font-medium text-[#3c4852]'><em className='text-[#00ff15]'>200+</em>exams available for your preparation</p>
                    </div>
                    <div>
                        <GoalSearchInput examGoals={examGoals} />
                    </div>
                    <div>
                        <h1 className='md:text-2xl text-2xl font-bold text-[#3c4852]'>Popular goals</h1>
                        <div>
                           
                        </div>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </section>
    );
}

export default GoadSkills;
