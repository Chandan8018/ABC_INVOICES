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

const demoData = {
  companyLogo: "https://via.placeholder.com/150",
  sellerDetails: {
    name: "ABC Pvt Ltd",
    address: "123, Main Street",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    panNo: "ABCDE1234F",
    gstRegistrationNo: "27ABCDE1234F1Z5",
  },
  placeOfSupply: "Maharashtra",
  billingDetails: {
    name: "John Doe",
    address: "456, Second Street",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411001",
    stateUtCode: "27",
  },
  shippingDetails: {
    name: "Jane Smith",
    address: "789, Third Street",
    city: "Nashik",
    state: "Maharashtra",
    pincode: "422001",
    stateUtCode: "27",
  },
  placeOfDelivery: "Maharashtra",
  orderDetails: {
    orderNo: "ORD123456",
    orderDate: "2024-06-26",
  },
  invoiceDetails: {
    invoiceNo: "INV654321",
    invoiceDetails: "Some additional details about the invoice",
    invoiceDate: "2024-06-27",
  },
  reverseCharge: false,
  itemDetails: [
    {
      description: "Item 1",
      unitPrice: 100,
      quantity: 2,
      discount: 10,
      taxRate: 18,
    },
    {
      description: "Item 2",
      unitPrice: 200,
      quantity: 1,
      discount: 20,
      taxRate: 18,
    },
    {
      description: "Item 3",
      unitPrice: 150,
      quantity: 3,
      discount: 15,
      taxRate: 18,
    },
  ],
  signatureImage: "https://via.placeholder.com/100",
};
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
