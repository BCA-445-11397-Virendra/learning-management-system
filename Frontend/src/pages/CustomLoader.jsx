import Loader from '@/components/custom/Loader';
import { useGetUserQuery } from '@/features/api/authApi';
import React from 'react';

const CustomLoader = ({ children }) => {
    const { isLoading } = useGetUserQuery();
    return (

        <div className='mx-auto'>
            {
                isLoading ? (<>
                 <Loader/>
                </>) : (
                    <>
                    {children}
                    </>
                )
            }
        </div>
    );
}

export default CustomLoader;
