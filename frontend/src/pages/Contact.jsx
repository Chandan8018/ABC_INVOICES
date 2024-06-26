import React from "react";
import { IoMdMail } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import { Link } from "react-router-dom";

function Contact() {
  return (
    <div className='min-h-screen w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center'>
      {/* Radial gradient for the container to give a faded look */}
      <div className='absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]'></div>
      <div className='flex flex-col gap-6 mt-2'>
        <div className='flex justify-start items-center'>
          <Link to='/'>
            <span className='flex justify-start items-center whitespace-nowrap text-5xl font-semibold dark:text-white'>
              <span className='bg-blue-500 dark:bg-[#ff5555] rounded-xl rounded-tr-none rounded-br-none py-3 pl-3 text-5xl font-bold'>
                ABC
              </span>{" "}
              <span className='bg-[#ff5555] dark:bg-blue-500 rounded-xl rounded-tl-none rounded-bl-none py-3 pr-3 text-5xl font-bold'>
                INVOICE
              </span>
            </span>
          </Link>
        </div>
        <span className='flex justify-start items-center gap-1 text-xl font-semibold'>
          <IoMdMail className='w-6 h-6 text-[#ff5555]' /> Help@OnlineQuiz.In
        </span>
        <span className='flex justify-start items-center gap-1 text-xl font-semibold'>
          <IoCall className='w-6 h-6 text-[#ff5555]' />{" "}
          +1234&nbsp;456&nbsp;67889
        </span>
      </div>
    </div>
  );
}

export default Contact;
