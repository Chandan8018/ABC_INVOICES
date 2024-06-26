import React from "react";
import { BackgroundGradient } from "../ui/background-gradient";

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

        <p className='text-sm text-neutral-600 dark:text-neutral-400'>
          The Air Jordan 4 Retro Reimagined Bred will release on Saturday,
          February 17, 2024. Your best opportunity to get these right now is by
          entering raffles and waiting for the official releases.The Air Jordan
          4 Retro Reimagined Bred will release on Saturday, February 17, 2024.
          Your best opportunity to get these right now is by entering
          raffles.The Air Jordan 4 Retro Reimagined Bred will release on
          Saturday, February 17, 2024. Your best opportunity to getary 17, 2024.
          Your best opportunity to geary 17, 2024. Your best opportunity to get
          these right now is by entering raffles and waiting for the official
          releases.The Air Jordan 4 Retro Reimagined Bred will release on
          Saturday, February 17, 2024. Your best opportunity to get these right
          now is by entering raffles and waiting for the official releases.The
          Air Jordan 4 Retro Reimagined Bred will release on Saturday, February
          17, 2024. Your best opportunity to get these right now is by entering
          raffles and waiting for the official releases.The Air Jordan 4 Retro
          Reimagined Bred will release on Saturday, February 17, 2024. Your best
          opportunity to get these right now is by entering raffles and waiting
          for the official releases.The Air Jordan 4 Retro Reimagined Bred will
          release on Saturday, February 17, 2024. Your best opportunity to get
          these right now is by entering raffles and waiting for the official
          releases.The Air Jordan 4 Retro Reimagined Bred will release on
          Saturday, February 17, 2024. Your best opportunity to get these right
          now is by entering raffles and waiting for the official releases.The
          Air Jordan 4 Retro Reimagined Bred will release on Saturday, February
          17, 2024. Your best opportunity to get these right now is by entering
          raffles and waiting for the official releases.The Air Jordan 4 Retro
          Reimagined Bred will release on Saturday, February 17, 2024. Your best
          opportunity to get these right now is by entering raffles and waiting
          for the official releases.The Air Jordan 4 Retro Reimagined Bred will
          release on Saturday, February 17, 2024. Your best opportunity to get
          these right now is by entering raffles and waiting for the official
          releases.The Air Jordan 4 Retro Reimagined Bred will release on
          Saturday, February 17, 2024. Your best opportunity to get these right
          now is by entering raffles and waiting for the official releases.The
          Air Jordan 4 Retro Reimagined Bred will release on Saturday, February
          17, 2024. Your best opportunity to get these right now is by entering
          raffles and waiting for the official releases.The Air Jordan 4 Retro
          Reimagined Bred will release on Saturday, February 17, 2024. Your best
          opportunity to get these right now is by entering raffles and waiting
          for the official releases.The Air Jordan 4 Retro Reimagined Bred will
          release on Saturday, February 17, 2024. Your best opportunity to get
          these right now is by entering raffles and waiting for the official
          releases.The Air Jordan 4 Retro Reimagined Bred will release on
          Saturday, February 17, 2024. Your best opportunity to get these right
          now is by entering raffles and waiting for the official releases.The
          Air Jordan 4 Retro Reimagined Bred will release on Saturday, February
          17, 2024. Your best opportunity to get these right now is by entering
          raffles and waiting for the official releases.
        </p>
        <button className='rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800'>
          <span>Buy now </span>
          <span className='bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white'>
            $100
          </span>
        </button>
      </BackgroundGradient>
    </div>
  );
}

export default Invoice;
