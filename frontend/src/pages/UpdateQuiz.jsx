import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Spotlight } from "../components/ui/Spotlight";
import { TypewriterEffectSmooth } from "../components/ui/typewriter-effect";
import { Alert, Spinner } from "flowbite-react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Update } from "../data/data";
import { Button } from "../components/ui/moving-border";
import { cn } from "../utils/cn";

function UpdateQuiz() {
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const navigate = useNavigate();
  const [publishError, setPublishError] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const { quizId } = useParams();

  useEffect(() => {
    try {
      const fetchQuiz = async () => {
        const res = await fetch(`/api/quiz/getquizzes?quizId=${quizId}`);
        const data = await res.json();
        if (!res.ok) {
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          setPublishError(null);
          setFormData(data.quizzes[0]);
        }
      };

      fetchQuiz();
    } catch (error) {
      console.log(error.message);
    }
  }, [quizId]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/quiz/update/${formData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        setLoading(false);
        navigate("/dashboard?tab=view-quiz");
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };
  return (
    <div className='py-12 w-full dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex justify-center items-center'>
      {/* Spot Light */}
      <Spotlight
        className='-top-40 left-0 md:left-60 md:-top-20 z-10'
        fill={theme === "dark" ? "white" : "#13C6F7"}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className='absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]'></div>
      {/* Sign Up Form */}
      <div className='max-w-3xl w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-[#abb1bb] dark:bg-[#1a232f] '>
        <div className='flex justify-center'>
          <TypewriterEffectSmooth words={Update} />
        </div>
        <p className='text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300'>
          Enter the details to access our Update features
        </p>
        <form className='mt-4' onSubmit={handleSubmit}>
          <LabelInputContainer>
            <Label htmlFor='question'>Quiz Question</Label>
            <Input
              id='question'
              placeholder='Enter Quiz...'
              type='text'
              onChange={(e) =>
                setFormData({ ...formData, question: e.target.value })
              }
              value={formData.question}
            />
          </LabelInputContainer>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
            <LabelInputContainer className='mb-4'>
              <Label htmlFor='option1'>Option1</Label>
              <Input
                id='option1'
                placeholder='Enter Option1...'
                type='text'
                onChange={(e) =>
                  setFormData({ ...formData, option1: e.target.value })
                }
                value={formData.option1}
              />
            </LabelInputContainer>
            <LabelInputContainer className='mb-4'>
              <Label htmlFor='option2'>Option2</Label>
              <Input
                id='option2'
                placeholder='Enter Option2...'
                type='text'
                onChange={(e) =>
                  setFormData({ ...formData, option2: e.target.value })
                }
                value={formData.option2}
              />
            </LabelInputContainer>

            <LabelInputContainer className='mb-4'>
              <Label htmlFor='option3'>Option3</Label>
              <Input
                id='option3'
                placeholder='Enter Option3...'
                type='text'
                onChange={(e) =>
                  setFormData({ ...formData, option3: e.target.value })
                }
                value={formData.question}
              />
            </LabelInputContainer>
            <LabelInputContainer className='mb-4'>
              <Label htmlFor='option4'>Option4</Label>
              <Input
                id='option4'
                placeholder='Enter Option4...'
                type='text'
                onChange={(e) =>
                  setFormData({ ...formData, option4: e.target.value })
                }
                value={formData.option4}
              />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className='mb-4'>
            <Label htmlFor='answer'>Answer</Label>
            <Input
              id='answer'
              placeholder='Enter Answer...'
              type='text'
              onChange={(e) =>
                setFormData({ ...formData, answer: e.target.value })
              }
              value={formData.answer}
            />
          </LabelInputContainer>
          {publishError && (
            <Alert className='mt-5' color='failure'>
              {publishError}
            </Alert>
          )}
          <Button
            borderRadius='8px'
            className='bg-[#ff5555] dark:bg-blue-400 hover:dark:bg-[#ff5555]  text-white  border-neutral-200 dark:border-slate-800 w-full text-md font-semibold h-12 rounded-[8px] hover:bg-blue-400'
            type='submit'
          >
            {loading ? (
              <>
                <Spinner size='sm' />
                <span className='pl-3'>Loading...</span>
              </>
            ) : (
              "Update Quiz"
            )}

            <BottomGradient />
          </Button>

          <div className='bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full' />
        </form>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className='group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent' />
      <span className='group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent' />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default UpdateQuiz;
