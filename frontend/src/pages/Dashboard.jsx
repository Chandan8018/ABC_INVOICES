import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import SideBarComp from "../components/dash/SideBarComp";
import DashboardComp from "../components/dash/DashboardComp";
import Profile from "../components/dash/Profile";
import ViewCustomers from "./ViewCustomers";
import CreateCustomer from "./CreateCustomer";
import Invoice from "../components/invoices/Invoice";
import ViewSuppliers from "./ViewSuppliers";
import CreateSupplier from "./CreateSupplier";

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
        {tab === "add-customer" && <CreateCustomer />}
        {tab === "add-supplier" && <CreateSupplier />}
        {tab === "view-customers" && <ViewCustomers />}
        {tab === "view-suppliers" && <ViewSuppliers />}
        {tab === "profile" && <Profile />}
        {tab === "invoice" && <Invoice />}
      </div>
    </>
  );
}
