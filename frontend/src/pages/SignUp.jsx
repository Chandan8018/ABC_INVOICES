import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "../utils/cn";
import { Spotlight } from "../components/ui/Spotlight";
import { Button } from "../components/ui/moving-border";
import { TypewriterEffectSmooth } from "../components/ui/typewriter-effect";
import { Word } from "../data/data";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Alert, Spinner } from "flowbite-react";
import OAuth from "../components/googleConfig/OAuth";

function SignUp() {
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.theme);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmpassword
    ) {
      return setErrorMessage("Please fill out all fields");
    }
    if (formData.password !== formData.confirmpassword) {
      return setErrorMessage("Passwords do not match");
    }
    try {
      setLoading(true);

      setErrorMessage(null);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        setErrorMessage(data.message);
      }

      setLoading(false);

      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
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
          <TypewriterEffectSmooth words={Word} />
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
            <Label htmlFor='username'>User name</Label>
            <Input
              id='username'
              placeholder='chandan123'
              type='text'
              onChange={handleChange}
            />
          </LabelInputContainer>

          <LabelInputContainer className='mb-4'>
            <Label htmlFor='email'>Email Address</Label>
            <Input
              id='email'
              placeholder='name@company.com'
              type='email'
              onChange={handleChange}
            />
          </LabelInputContainer>
          <LabelInputContainer className='mb-4'>
            <Label htmlFor='password'>Password</Label>
            <Input
              id='password'
              placeholder='••••••••'
              type='password'
              onChange={handleChange}
            />
          </LabelInputContainer>
          <LabelInputContainer className='mb-8'>
            <Label htmlFor='confirmpassword'>Confirm password</Label>
            <Input
              id='confirmpassword'
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
              "Sign Up"
            )}

            <BottomGradient />
          </Button>

          <div className='bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full' />
        </form>
        <OAuth />
        <div className='bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full' />
        <div className='flex justify-start gap-1 opacity-100'>
          <span className='text-md font-normal text-black dark:text-white'>
            Have an account?
          </span>
          <span
            className='text-md font-normal text-blue-500 cursor-pointer'
            onClick={() => navigate("/sign-in")}
          >
            Sign In
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

export default SignUp;
