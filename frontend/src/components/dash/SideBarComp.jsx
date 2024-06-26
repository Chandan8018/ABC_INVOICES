import { Drawer, Sidebar, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { HiSearch } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signoutSuccess } from "../../redux/user/userSlice";
import { CiCircleChevRight } from "react-icons/ci";
import SidebarIcons from "./SidebarIcons";
import { Button } from "../ui/moving-border";

function SideBarComp() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [tab, setTab] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { DashboardIcon, ProfileIcon, ViewcustomersIcon, InvoiceIcon } =
    SidebarIcons();

  const handleClose = () => setIsOpen(false);

  useEffect(() => {
    const urlPharse = new URLSearchParams(location.search);
    const tabFromUrl = urlPharse.get("tab");
    setTab(tabFromUrl);
  }, [location.search]);
  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    currentUser && (
      <>
        <div className='flex items-center h-full ml-0 md:ml-2 '>
          <Button
            borderRadius='1.75rem'
            className='bg-transparent text-black dark:text-white border-neutral-200 dark:border-slate-800 h-8 w-8'
            onClick={() => setIsOpen(true)}
          >
            <CiCircleChevRight className='h-7 w-7' />
          </Button>
        </div>
        <Drawer
          open={isOpen}
          onClose={handleClose}
          className='w-[225px] h-screen'
        >
          <Drawer.Header
            title={
              <Link to='/'>
                <span className='flex justify-start items-center whitespace-nowrap text-xl font-semibold dark:text-white pl-7'>
                  <span className='bg-blue-500 dark:bg-[#ff5555] rounded-xl rounded-tr-none rounded-br-none py-1 px-1 text-xl font-bold'>
                    ABC
                  </span>{" "}
                  <span className='bg-[#ff5555] dark:bg-blue-500 rounded-xl rounded-tl-none rounded-bl-none py-1 px-1 text-xl font-bold'>
                    INVOICE
                  </span>
                </span>
              </Link>
            }
            titleIcon={() => <></>}
          />
          <Drawer.Items>
            <Sidebar
              aria-label='Sidebar with multi-level dropdown example'
              className='[&>div]:bg-transparent [&>div]:p-0'
            >
              <div className='flex h-full flex-col justify-between py-2'>
                <div>
                  <form className='pb-3 md:hidden'>
                    <TextInput
                      icon={HiSearch}
                      type='search'
                      placeholder='Search'
                      required
                      className='w-48'
                    />
                  </form>
                  <Sidebar.Items>
                    <Sidebar.ItemGroup>
                      <Link to='/dashboard?tab=dash'>
                        <Sidebar.Item
                          active={tab === "dash"}
                          icon={DashboardIcon}
                          className='cursor-pointer  hover:bg-[#ff5555] hover:dark:bg-[#0345fc] hover:text-white hover:text-md hover:opacity-85 rounded-lg w-48 mb-4'
                          as='div'
                        >
                          Dashboard
                        </Sidebar.Item>
                      </Link>

                      <Link to='/dashboard?tab=view-customers'>
                        <Sidebar.Item
                          active={tab === "view-customers"}
                          icon={ViewcustomersIcon}
                          className='cursor-pointer  hover:bg-[#ff5555] hover:dark:bg-[#0345fc] hover:text-white hover:text-md hover:opacity-85 rounded-lg w-48 mb-4'
                          as='div'
                        >
                          Customers
                        </Sidebar.Item>
                      </Link>

                      <Link to='/dashboard?tab=invoice'>
                        <Sidebar.Item
                          active={tab === "invoice"}
                          icon={InvoiceIcon}
                          className='cursor-pointer  hover:bg-[#ff5555] hover:dark:bg-[#0345fc] hover:text-white hover:text-md hover:opacity-85 rounded-lg w-48 mb-4'
                          as='div'
                        >
                          Invoice
                        </Sidebar.Item>
                      </Link>

                      <Link to='/dashboard?tab=profile'>
                        <Sidebar.Item
                          active={tab === "profile"}
                          icon={ProfileIcon}
                          className='cursor-pointer  hover:bg-[#ff5555] hover:dark:bg-[#0345fc] hover:text-white hover:text-md hover:opacity-85 rounded-lg w-48 mb-4'
                          as='div'
                        >
                          Profile
                        </Sidebar.Item>
                      </Link>

                      <Sidebar.Item
                        icon={FaSignOutAlt}
                        className='cursor-pointer  hover:bg-[#ff5555] hover:dark:bg-[#ff5555] hover:text-white hover:text-md hover:opacity-85 rounded-lg w-48 mb-4'
                        onClick={() => {
                          handleSignout();
                          dispatch(signoutSuccess());
                          navigate("/");
                        }}
                      >
                        Sign Out
                      </Sidebar.Item>
                    </Sidebar.ItemGroup>
                  </Sidebar.Items>
                </div>
              </div>
            </Sidebar>
          </Drawer.Items>
        </Drawer>
      </>
    )
  );
}

export default SideBarComp;
