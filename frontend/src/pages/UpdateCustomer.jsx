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
import { Select } from "../components/ui/Select";
import { TextArea } from "../components/ui/TextArea";

function UpdateCustomer() {
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const navigate = useNavigate();
  const [publishError, setPublishError] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const { customerId } = useParams();

  useEffect(() => {
    try {
      const fetchCustomer = async () => {
        const res = await fetch(
          `/api/customer/getCustomers?customerId=${customerId}`
        );
        const data = await res.json();
        if (!res.ok) {
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          setPublishError(null);
          setFormData(data.customers[0]);
        }
      };

      fetchCustomer();
    } catch (error) {
      console.log(error.message);
    }
  }, [customerId]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        `/api/customer/update/${formData._id}/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        setLoading(false);
        navigate("/dashboard?tab=view-customers");
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
            <Label htmlFor='name'>Customer Name</Label>
            <Input
              id='name'
              type='text'
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              value={formData.name}
            />
          </LabelInputContainer>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
            <LabelInputContainer className='mb-4'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='text'
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                value={formData.email}
              />
            </LabelInputContainer>
            <LabelInputContainer className='mb-4'>
              <Label htmlFor='phone'>Phone Number</Label>
              <Input
                id='phone'
                type='text'
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                value={formData.phone}
              />
            </LabelInputContainer>
          </div>

          <LabelInputContainer className='mb-4'>
            <Label htmlFor='address'>Address</Label>
            <TextArea
              id='address'
              type='text'
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              value={formData.address}
            />
          </LabelInputContainer>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 my-4'>
            <LabelInputContainer className='mb-4'>
              <Label htmlFor='state'>State</Label>
              <Select
                id='state'
                type='text'
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
                value={formData.state}
              >
                <option value=''>Select State</option>
                <option value='Gujarat'>Gujarat</option>
                <option value='Maharashtra'>Maharashtra</option>
                <option value='Odisha'>Odisha</option>
                <option value='Rajasthan'>Rajasthan</option>
                <option value='Uttar Pradesh'>Uttar Pradesh</option>
                <option value='Delhi'>Delhi</option>
                <option value='Karnataka'>Karnataka</option>
                <option value='Tamilnadu'>Tamilnadu</option>
                <option value='Kerala'>Kerala</option>
                <option value='West Bengal'>West Bengal</option>
                <option value='Haryana'>Haryana</option>
                <option value='Madhya Pradesh'>Madhya Pradesh</option>
                <option value='Punjab'>Punjab</option>
                <option value='Jharkhand'>Jharkhand</option>
                <option value='Bihar'>Bihar</option>
                <option value='Chhattisgarh'>Chhattisgarh</option>
                <option value='Other'>Other</option>
              </Select>
            </LabelInputContainer>

            <LabelInputContainer className='mb-4'>
              <Label htmlFor='country'>Country</Label>
              <Select
                id='country'
                type='text'
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
                value={formData.country}
              >
                <option value=''>Select Country</option>
                <option value='India'>India</option>
                <option value='USA'>USA</option>
                <option value='UK'>UK</option>
                <option value='Australia'>Australia</option>
                <option value='Canada'>Canada</option>
                <option value='Japan'>Japan</option>
                <option value='China'>China</option>
                <option value='Other'>Other</option>
              </Select>
            </LabelInputContainer>
          </div>
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
              "Update"
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

export default UpdateCustomer;
