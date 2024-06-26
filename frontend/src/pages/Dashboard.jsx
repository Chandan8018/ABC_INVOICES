import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import SideBarComp from "../components/dash/SideBarComp";
import DashboardComp from "../components/dash/DashboardComp";
import Profile from "../components/dash/Profile";
import PostQuiz from "./PostQuiz";
import ViewQuiz from "./ViewQuiz";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlPharse = new URLSearchParams(location.search);
    const tabFromUrl = urlPharse.get("tab");
    setTab(tabFromUrl);
  }, [location.search]);
  return (
    <>
      <div className='min-h-screen flex items-start gap-1'>
        <div className='mt-10'>
          {/* SideBar  */}
          <SideBarComp />
        </div>

        {tab === "dash" && <DashboardComp />}
        {tab === "post-quiz" && <PostQuiz />}
        {tab === "view-quiz" && <ViewQuiz />}
        {tab === "profile" && <Profile />}
      </div>
    </>
  );
}
