import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "../utils/cn";
import { Spotlight } from "../components/ui/Spotlight";
import { Button } from "../components/ui/moving-border";
import { TypewriterEffectSmooth } from "../components/ui/typewriter-effect";
import { Create } from "../data/data";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Alert, Spinner } from "flowbite-react";

function PostQuiz() {
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.theme);
  const { currentUser } = useSelector((state) => state.user);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.question ||
      !formData.option1 ||
      !formData.option2 ||
      !formData.option3 ||
      !formData.option4 ||
      !formData.answer
    ) {
      return setErrorMessage("Please fill out all fields");
    }
    if (!currentUser.isAdmin) {
      return setErrorMessage("You are not allowed to create a quiz");
    }

    try {
      const res = await fetch("/api/quiz/create", {
        method: "POST",
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
        navigate(`/quiz-post/${data.slug}`);
      }
    } catch (error) {
      setPublishError("Something went wrong last", error);
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
          <TypewriterEffectSmooth words={Create} />
        </div>
        <p className='text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300'>
          Create an account to access our features
        </p>
        {errorMessage && (
          <Alert className='mt-5' color='failure'>
            {errorMessage}
          </Alert>
        )}
        <form className='mt-4' onSubmit={handleSubmit}>
          <LabelInputContainer>
            <Label htmlFor='question'>Quiz Question</Label>
            <Input
              id='question'
              placeholder='Enter Quiz...'
              type='text'
              onChange={handleChange}
            />
          </LabelInputContainer>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
            <LabelInputContainer className='mb-4'>
              <Label htmlFor='option1'>Option1</Label>
              <Input
                id='option1'
                placeholder='Enter Option1...'
                type='text'
                onChange={handleChange}
              />
            </LabelInputContainer>
            <LabelInputContainer className='mb-4'>
              <Label htmlFor='option2'>Option2</Label>
              <Input
                id='option2'
                placeholder='Enter Option2...'
                type='text'
                onChange={handleChange}
              />
            </LabelInputContainer>

            <LabelInputContainer className='mb-4'>
              <Label htmlFor='option3'>Option3</Label>
              <Input
                id='option3'
                placeholder='Enter Option3...'
                type='text'
                onChange={handleChange}
              />
            </LabelInputContainer>
            <LabelInputContainer className='mb-4'>
              <Label htmlFor='option4'>Option4</Label>
              <Input
                id='option4'
                placeholder='Enter Option4...'
                type='text'
                onChange={handleChange}
              />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className='mb-4'>
            <Label htmlFor='answer'>Answer</Label>
            <Input
              id='answer'
              placeholder='Enter Answer...'
              type='text'
              onChange={handleChange}
            />
          </LabelInputContainer>
          {publishError && (
            <Alert className='my-5' color='failure'>
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
              "Create Quiz"
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

export default PostQuiz;
