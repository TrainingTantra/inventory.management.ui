import React from 'react';
import { Link } from "react-router-dom";
import { FcHome } from 'react-icons/fc'

const NotFound = () => {
  return (
    <>
      <div className='flex justify-center items-center'>
        <h2>
          Sorry! This Page Doesn&apos;t Seem To Exist...
        </h2>
        <p>
          The page you are looking for doesn&apos;t exist or there may have been
          an error.
        </p>
      </div>
      <div>
        <Link className='flex justify-center items-center my-6 underline' to='/'>
          <FcHome className='text-2xl mr-2' />
          <span className='text-blue-600'>Home</span>
        </Link>
      </div>
    </>
  );
}

export default NotFound

