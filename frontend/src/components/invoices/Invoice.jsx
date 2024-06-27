import React from "react";
import { BackgroundGradient } from "../ui/background-gradient";
import FullFeaturedCrudGrid from "./FullFeaturedCrudGrid";

function Invoice() {
  return (
    <div className='mx-auto my-10'>
      <BackgroundGradient className='rounded-[8px] min-h-screen max-w-5xl p-4 sm:p-10 bg-white dark:bg-zinc-900'>
        <div className='flex justify-between'>
          <span className='flex justify-start items-center whitespace-nowrap text-xl font-semibold dark:text-white pl-7'>
            <span className='bg-blue-500 dark:bg-[#ff5555] rounded-xl rounded-tr-none rounded-br-none py-1 px-1 text-xl font-bold'>
              ABC
            </span>{" "}
            <span className='bg-[#ff5555] dark:bg-blue-500 rounded-xl rounded-tl-none rounded-bl-none py-1 px-1 text-xl font-bold'>
              INVOICE
            </span>
          </span>
          <div className='flex flex-col gap-1 justify-start items-end'>
            <h2 className='text-xl md:text-2xl text-black dark:text-neutral-200'>
              Tax Invoice/Bill of Supply/Case Memo
            </h2>
            <h4>(Original for Recipient)</h4>
          </div>
        </div>

        <FullFeaturedCrudGrid />
      </BackgroundGradient>
    </div>
  );
}

export default Invoice;
