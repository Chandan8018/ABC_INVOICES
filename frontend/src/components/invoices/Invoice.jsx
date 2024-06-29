import React, { useEffect, useState } from "react";
import { BackgroundGradient } from "../ui/background-gradient";
import FullFeaturedCrudGrid from "./FullFeaturedCrudGrid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SaveIcon from "@mui/icons-material/Save";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import html2canvas from "html2canvas";
import InvoiceDocument from "./InvoiceDocument "; // Assuming you create InvoiceDocument.js for PDF structure

function Invoice() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [suppliersName, setSuppliersName] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [supplierDetails, setSupplierDetails] = useState([]);
  const [supplierFetched, setSupplierFetched] = useState(false);
  const [supplierFound, setSupplierFound] = useState(false);
  const [placeOfSupply, setPlaceOfSupply] = useState("");

  const [customersName, setCustomersName] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [customerDetails, setCustomerDetails] = useState([]);
  const [customerFetched, setCustomerFetched] = useState(false);
  const [customerFound, setCustomerFound] = useState(false);
  const [placeOfDelivery, setPlaceOfDelivery] = useState("");

  useEffect(() => {
    if (supplierFound && customerFound) {
      setPlaceOfSupply(supplierDetails[0].state);
      setPlaceOfDelivery(customerDetails[0].state);
    }
  }, [supplierFound, customerFound]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const res = await fetch(`/api/supplier/getSuppliers`);
        const data = await res.json();
        if (res.ok) {
          setSuppliersName(
            data.suppliers
              .filter((supplier) => currentUser._id === supplier.userId)
              .map((supplier) => supplier.name)
          );
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchCustomers = async () => {
      try {
        const res = await fetch(`/api/customer/getCustomers`);
        const data = await res.json();
        if (res.ok) {
          setCustomersName(
            data.customers
              .filter((customer) => currentUser._id === customer.userId)
              .map((customer) => customer.name)
          );
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser) {
      fetchSuppliers();
      fetchCustomers();
    }
  }, [currentUser._id]);

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const res = await fetch(
          `/api/supplier/getSuppliers?name=${selectedSupplier}`
        );
        const data = await res.json();
        if (res.ok) {
          setSupplierDetails(data.suppliers);
          setSupplierFetched(false);
        } else {
          setSupplierFound(false);
          setSupplierDetails([]);
        }
      } catch (error) {
        setSupplierFound(false);
        console.log(error.message);
      }
    };

    fetchSupplier();
  }, [selectedSupplier]);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await fetch(
          `/api/customer/getCustomers?name=${selectedCustomer}`
        );
        const data = await res.json();
        if (res.ok) {
          setCustomerDetails(data.customers);
          setCustomerFetched(false);
        } else {
          setCustomerFound(false);
          setCustomerDetails([]);
        }
      } catch (error) {
        setSupplierFound(false);
        console.log(error.message);
      }
    };

    fetchCustomer();
  }, [selectedCustomer]);

  return (
    <div className='mx-auto p-4 md:p-10 overflow-x-auto scrollbar scrollbar-track-slate-700 scrollbar-thumb-black dark:scrollbar-track-slate-400 dark:scrollbar-thumb-white'>
      <BackgroundGradient className='rounded-[8px] min-h-screen w-full md:w-5xl p-4 sm:p-10 bg-white dark:bg-zinc-900'>
        <div className='flex flex-col md:flex-row justify-between'>
          <span className='flex justify-start items-center whitespace-nowrap text-lg md:text-xl font-semibold dark:text-white pl-7'>
            <span className='bg-blue-500 dark:bg-[#ff5555] rounded-xl rounded-tr-none rounded-br-none py-1 px-1 text-lg md:text-xl font-bold'>
              ABC
            </span>{" "}
            <span className='bg-[#ff5555] dark:bg-blue-500 rounded-xl rounded-tl-none rounded-bl-none py-1 px-1 text-lg md:text-xl font-bold'>
              INVOICE
            </span>
          </span>
          <div className='flex flex-col gap-1 justify-start items-end'>
            <h2 className='text-lg md:text-2xl text-black dark:text-neutral-200'>
              Tax Invoice/Bill of Supply/Case Memo
            </h2>
            <h4>(Original for Recipient)</h4>
          </div>
        </div>
        <hr />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
          {/* Supplier Details / 1st Grid */}
          <div className=''>
            {supplierFound ? (
              supplierFetched ? (
                <Stack sx={{ color: "grey.500" }} spacing={2} direction='row'>
                  <CircularProgress color='success' />
                </Stack>
              ) : (
                <div className='dark:text-[#878E9B]'>
                  <span className='text-xl font-semibold'>Sold By:</span>
                  <p>{supplierDetails[0].name}</p>
                  <p className='text-sm'>{supplierDetails[0].address}</p>
                  <p>
                    {supplierDetails[0].state} {supplierDetails[0].country}
                  </p>
                  <p className='mt-3'>
                    <span className='font-semibold'>PAN No:</span>
                    {supplierDetails[0].PAN}
                  </p>
                  <p>
                    <span className='font-semibold'>GST Regd. No:</span>
                    {supplierDetails[0].GST}
                  </p>
                </div>
              )
            ) : (
              <>
                <FormControl sx={{ m: 1, minWidth: 150 }}>
                  <InputLabel
                    id='demo-simple-select-helper-label'
                    sx={{ color: theme === "dark" && "#878E9B" }}
                  >
                    Supplier
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-helper-label'
                    id='demo-simple-select-helper'
                    value={selectedSupplier}
                    label='Supplier'
                    onChange={(e) => {
                      setSelectedSupplier(e.target.value);
                      setSupplierFound(true);
                      setSupplierFetched(true);
                    }}
                    sx={{
                      border: theme === "dark" && "1px solid #878E9B",
                      "& .MuiSelect-icon": {
                        color: theme === "dark" && "#878E9B",
                      },
                      "&.Mui-focused": {
                        border: "none",
                      },
                    }}
                  >
                    <MenuItem value=''>
                      <em>None</em>
                    </MenuItem>
                    {suppliersName.map((supplier) => (
                      <MenuItem key={supplier} value={supplier}>
                        {supplier}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText sx={{ color: theme === "dark" && "#878E9B" }}>
                    Select supplier otherwise click below button.
                  </FormHelperText>
                </FormControl>

                <Box
                  sx={{
                    height: 120,
                    transform: "translateZ(0px)",
                    flexGrow: 1,
                  }}
                >
                  <SpeedDial
                    ariaLabel='SpeedDial basic example'
                    sx={{ marginLeft: "0", marginTop: "16px" }}
                    icon={<SpeedDialIcon />}
                  >
                    <SpeedDialAction
                      onClick={() => navigate("/dashboard?tab=add-supplier")}
                      key={"Add supplier"}
                      icon={<SaveIcon />}
                      tooltipTitle={"Add supplier"}
                    />
                  </SpeedDial>
                </Box>
              </>
            )}
          </div>
          {/* Customer Details / 2nd Grid */}
          <div className=''>
            {customerFound ? (
              customerFetched ? (
                <Stack sx={{ color: "grey.500" }} spacing={2} direction='row'>
                  <CircularProgress color='success' />
                </Stack>
              ) : (
                <div className='dark:text-[#878E9B]'>
                  <div className='flex flex-col items-end'>
                    <span className='text-xl font-semibold'>
                      Billing Address:
                    </span>
                    <p>{customerDetails[0].name}</p>
                    <p className='text-sm'>{customerDetails[0].address}</p>
                    <p>
                      {customerDetails[0].state} {customerDetails[0].country}
                    </p>
                  </div>
                  <hr />
                  <div className='flex flex-col items-end'>
                    <span className='text-xl font-semibold mt-5'>
                      Shipping Address:
                    </span>
                    <p>{customerDetails[0].name}</p>
                    <p className='text-sm'>{customerDetails[0].address}</p>
                    <p>
                      {customerDetails[0].state} {customerDetails[0].country}
                    </p>
                  </div>
                </div>
              )
            ) : (
              <div className='flex justify-end'>
                <div>
                  <FormControl sx={{ m: 1, minWidth: 150 }}>
                    <InputLabel
                      id='demo-simple-select-helper-label'
                      sx={{ color: theme === "dark" && "#878E9B" }}
                    >
                      Customer
                    </InputLabel>
                    <Select
                      labelId='demo-simple-select-helper-label'
                      id='demo-simple-select-helper'
                      value={selectedCustomer}
                      label='Customer'
                      onChange={(e) => {
                        setSelectedCustomer(e.target.value);
                        setCustomerFound(true);
                        setCustomerFetched(true);
                      }}
                      sx={{
                        border: theme === "dark" && "1px solid #878E9B",
                        "& .MuiSelect-icon": {
                          color: theme === "dark" && "#878E9B",
                        },
                        "&.Mui-focused": {
                          border: "none",
                        },
                      }}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
                      {customersName.map((customer) => (
                        <MenuItem key={customer} value={customer}>
                          {customer}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText
                      sx={{ color: theme === "dark" && "#878E9B" }}
                    >
                      Select customer otherwise click below button.
                    </FormHelperText>
                  </FormControl>

                  <Box
                    sx={{
                      height: 120,
                      transform: "translateZ(0px)",
                      flexGrow: 1,
                    }}
                  >
                    <SpeedDial
                      ariaLabel='SpeedDial basic example'
                      sx={{ marginRight: "0", marginTop: "16px" }}
                      icon={<SpeedDialIcon />}
                    >
                      <SpeedDialAction
                        onClick={() => navigate("/dashboard?tab=add-customer")}
                        key={"Add customer"}
                        icon={<SaveIcon />}
                        tooltipTitle={"Add Customer"}
                      />
                    </SpeedDial>
                  </Box>
                </div>
              </div>
            )}
          </div>
          {/* 3rd Grid */}
          <div className='dark:text-[#878E9B]'>
            <h3>
              <span className='font-bold tracking-tighter'>Order Number:</span>
            </h3>
            <h3>
              <span className='font-bold tracking-tighter'>Order Date:</span>{" "}
              {new Date().toLocaleDateString()}
            </h3>
          </div>
          {/* 4th Grid */}
          <div className='flex flex-col items-end dark:text-[#878E9B]'>
            <h3>
              <span className='font-bold tracking-tighter'>
                Invoice Number:
              </span>
            </h3>
            <h3>
              <span className='font-bold tracking-tighter'>Invoice Date:</span>{" "}
              {new Date().toLocaleDateString()}
            </h3>
          </div>
        </div>
        <FullFeaturedCrudGrid
          placeOfSupply={placeOfSupply}
          placeOfDelivery={placeOfDelivery}
        />

        {supplierFound && (
          <div className='w-full pr-1 border-[1px] border-opacity-35 dark:border-opacity-55 border-solid border-black dark:border-white dark:bg-slate-800 flex flex-col items-end gap-2'>
            <span className='font-bold text-xl dark:text-[#878E9B]'>
              for {supplierDetails[0].name}
            </span>
            <img
              src={supplierDetails[0].signature}
              alt={`${supplierDetails[0].name} Signature`}
              className='w-48 h-10 border-[2px] border-solid border-black dark:border-white dark:bg-slate-800'
            />
            <span className='font-bold text-xl dark:text-[#878E9B]'>
              Authorized Signatory
            </span>
          </div>
        )}
        <div className='flex justify-end mt-4'>
          <PDFDownloadLink
            document={
              supplierFound &&
              customerFound && (
                <InvoiceDocument
                  invoiceData={{ supplierDetails, customerDetails }}
                />
              )
            }
            fileName='invoice.pdf'
          >
            {({ blob, url, loading, error }) =>
              loading ? "Loading document..." : "Download PDF"
            }
          </PDFDownloadLink>
        </div>
      </BackgroundGradient>
    </div>
  );
}

export default Invoice;
