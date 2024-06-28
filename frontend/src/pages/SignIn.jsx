import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "../utils/cn";
import { Spotlight } from "../components/ui/Spotlight";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "../components/ui/moving-border";
import { Word } from "../data/data";
import { TypewriterEffectSmooth } from "../components/ui/typewriter-effect";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { Alert, Spinner } from "flowbite-react";
import OAuth from "../components/googleConfig/OAuth";

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const { currentUser } = useSelector((state) => state.user);
  const userState = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});

  const { loading, error: errorMessage } = userState || {
    loading: false,
    error: null,
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill out all fields"));
    }

    try {
      dispatch(signInStart());

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        //setErrorMessage(data.message)
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/dashboard?tab=profile");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
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
      {/* Log In Form */}
      <div className='max-w-3xl w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-[#abb1bb] dark:bg-[#1a232f] '>
        <div className='flex justify-center'>
          <TypewriterEffectSmooth words={Word} />
        </div>

        <div className='flex flex-col gap-2 text-md font-medium border-solid border-2 rounded-md p-2'>
          <span>Demo Account:</span>
          <span>email: demo@gmail.com</span>
          <span>password: demo@123</span>
        </div>

        {errorMessage && (
          <Alert className='mt-5' color='failure'>
            {errorMessage}
          </Alert>
        )}
        <form className='my-4' onSubmit={handleSubmit}>
          <LabelInputContainer className='mb-4'>
            <Label htmlFor='email'>Email Address</Label>
            <Input
              id='email'
              placeholder='name@company.com'
              type='email'
              onChange={handleChange}
            />
          </LabelInputContainer>

          <LabelInputContainer className='mb-8'>
            <Label htmlFor='password'>Password</Label>
            <Input
              id='password'
              placeholder='••••••••'
              type='password'
              onChange={handleChange}
            />
          </LabelInputContainer>

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
              "Sign In"
            )}
            <BottomGradient />
          </Button>

          <div className='bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full' />
          <OAuth />
        </form>
        <div className='bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full' />
        <div className='flex justify-start gap-1 opacity-100'>
          <span className='text-md font-normal text-black dark:text-white'>
            Don't have an account?
          </span>
          <span
            className='text-md font-normal text-blue-600 cursor-pointer'
            onClick={() => navigate("/sign-up")}
          >
            Sign Up
          </span>
        </div>
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

export default SignIn;
