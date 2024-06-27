import React, { useEffect, useState } from "react";
import { HiUser } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { Button } from "../ui/moving-border";
import { FaUsers, FaFileInvoice } from "react-icons/fa";
import { SiHomeassistantcommunitystore } from "react-icons/si";

const SidebarIcons = () => {
  const [tab, setTab] = useState("");
  const location = useLocation();

  useEffect(() => {
    const urlPharse = new URLSearchParams(location.search);
    const tabFromUrl = urlPharse.get("tab");
    setTab(tabFromUrl);
  }, [location.search]);

  const DashboardIcon = () =>
    tab === "dash" ? (
      <div className=''>
        <Button
          borderRadius='1.75rem'
          className='bg-transparent text-black dark:text-white border-neutral-200 dark:border-slate-800 h-8 w-8'
        >
          <MdDashboard className='w-5 h-5 text-[#46C5F0]' />
        </Button>
      </div>
    ) : (
      <MdDashboard className='w-5 h-5' />
    );

  const ViewcustomersIcon = () =>
    tab === "view-customers" ? (
      <div className=''>
        <Button
          borderRadius='1.75rem'
          className='bg-transparent text-black dark:text-white border-neutral-200 dark:border-slate-800 h-8 w-8'
        >
          <FaUsers className='w-5 h-5 text-[#46C5F0]' />
        </Button>
      </div>
    ) : (
      <FaUsers className='w-5 h-5' />
    );
  const InvoiceIcon = () =>
    tab === "invoice" ? (
      <div className=''>
        <Button
          borderRadius='1.75rem'
          className='bg-transparent text-black dark:text-white border-neutral-200 dark:border-slate-800 h-8 w-8'
        >
          <FaFileInvoice className='w-5 h-5 text-[#46C5F0]' />
        </Button>
      </div>
    ) : (
      <FaFileInvoice className='w-5 h-5' />
    );
  const ProfileIcon = () =>
    tab === "profile" ? (
      <div className=''>
        <Button
          borderRadius='1.75rem'
          className='bg-transparent text-black dark:text-white border-neutral-200 dark:border-slate-800 h-8 w-8'
        >
          <HiUser className='w-5 h-5 text-[#46C5F0]' />
        </Button>
      </div>
    ) : (
      <HiUser className='w-5 h-5' />
    );

  const SupplierIcon = () =>
    tab === "view-suppliers" ? (
      <div className=''>
        <Button
          borderRadius='1.75rem'
          className='bg-transparent text-black dark:text-white border-neutral-200 dark:border-slate-800 h-8 w-8'
        >
          <SiHomeassistantcommunitystore className='w-5 h-5 text-[#46C5F0]' />
        </Button>
      </div>
    ) : (
      <SiHomeassistantcommunitystore className='w-5 h-5' />
    );

  return {
    DashboardIcon,
    ProfileIcon,
    ViewcustomersIcon,
    InvoiceIcon,
    SupplierIcon,
  };
};

export default SidebarIcons;
