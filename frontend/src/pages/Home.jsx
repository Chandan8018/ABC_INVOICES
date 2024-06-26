import React from "react";
import { home } from "../data/data";
import { Spotlight } from "../components/ui/Spotlight";
import { Button } from "../components/ui/moving-border";
import { TypewriterEffectSmooth } from "../components/ui/typewriter-effect";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.theme);
  return (
    <div className='min-h-screen w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center'>
      <Spotlight
        className='-top-40 left-0 md:left-60 md:-top-20 z-10'
        fill={theme === "dark" ? "white" : "#13C6F7"}
      />
      <div className='absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]'></div>
      <div className='flex flex-col'>
        <p className='text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8'>
          Welcome to
          <div className='flex justify-center'>
            <TypewriterEffectSmooth words={home} />
          </div>
        </p>
        <div className='flex justify-center gap-10'>
          <Button
            borderRadius='4px'
            className='bg-black text-white border-slate-800 h-10 rounded-[3px]'
            onClick={() => navigate("/service")}
          >
            Our Services
          </Button>
          <Button
            borderRadius='4px'
            className='bg-black text-white border-slate-800 h-10 rounded-[3px]'
            onClick={() => navigate("/contact")}
          >
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
