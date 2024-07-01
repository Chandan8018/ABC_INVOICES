import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import { Avatar } from "@mui/material";
import Badge from "@mui/material/Badge";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { HiArrowNarrowUp, HiOutlineUserGroup } from "react-icons/hi";
import { FaRupeeSign, FaShoppingCart } from "react-icons/fa";

function DashboardComp() {
  const { currentUser } = useSelector((state) => state.user);
  const theme = useSelector((state) => state.theme.theme);
  const [invoiceData, setInvoiceData] = React.useState({});
  const [dataFetchedSuccessfully, setDataFetchedSuccessfully] =
    React.useState(false);
  const [
    customersDataFetchedSuccessfully,
    setCustomersDataFetchedSuccessfully,
  ] = React.useState(false);
  const [customers, setCustomers] = React.useState({});
  React.useEffect(() => {
    const fetchJsonData = async () => {
      try {
        const res = await fetch(`/api/invoice/getInvoices`);
        const newData = await res.json();
        if (res.ok) {
          setInvoiceData(newData);
          setDataFetchedSuccessfully(true);
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
          setCustomers(data);
          setCustomersDataFetchedSuccessfully(true);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser._id) {
      fetchCustomers();
      fetchJsonData();
    }
  }, []);

  const Item = styled(Paper)(() => ({
    backgroundColor: theme === "dark" ? "#1A2027" : "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: theme === "dark" ? "white" : "black",
  }));

  const StyledBadge = styled(Badge)(() => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      boxShadow: `0 0 0 2px ${theme}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));

  return (
    <div className='min-h-screen w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative '>
      {/* Radial gradient for the container to give a faded look */}
      {dataFetchedSuccessfully && customersDataFetchedSuccessfully && (
        <>
          <Box sx={{ width: "96%", marginTop: "20px", marginLeft: "5px" }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={12} sm={12} md={4} width={400} height={250}>
                <Item>
                  <div className='flex flex-col justify-center items-center gap-4 mb-7'>
                    <h1 className='mb-1'>Active Profile</h1>
                    <StyledBadge
                      overlap='circular'
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      variant='dot'
                    >
                      <Avatar
                        alt={currentUser.username}
                        src={currentUser.profilePicture}
                        sx={{ width: 115, height: 115 }}
                      />
                    </StyledBadge>
                    <h1 className='text-xl font-bold text-blue-500'>
                      Welcome {currentUser.username}
                    </h1>
                    <h3>
                      <MarkEmailReadIcon />
                      {currentUser.email}
                    </h3>
                  </div>
                </Item>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Item>
                  <h1>Last 5 Orders from Customer</h1>
                  <LineChart
                    width={350}
                    height={250}
                    series={[
                      {
                        data: invoiceData.invoices.map((data) =>
                          Math.round(data.totalAmount)
                        ),
                        label: "Order Amount",
                      },
                    ]}
                    xAxis={[
                      {
                        scaleType: "point",
                        data: invoiceData.invoices.map(
                          (data) => data.customer.name
                        ),
                      },
                    ]}
                    sx={{
                      border: `1px solid rgba(${
                        theme === "dark" ? "255,255,255" : "0, 0, 0"
                      }, 0.1)`,
                      [`.${axisClasses.root}`]: {
                        [`.${axisClasses.tick}, .${axisClasses.line}`]: {
                          stroke: theme === "dark" ? "white" : "#878E9B",
                          strokeWidth: 0.5,
                        },
                        [`.${axisClasses.tickLabel}`]: {
                          fill: theme === "dark" ? "white" : "#878E9B",
                        },
                      },
                    }}
                  />
                </Item>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Item>
                  <h1>Last 5 Orders received by Supplier</h1>
                  <BarChart
                    width={350}
                    height={250}
                    series={[
                      {
                        data: invoiceData.invoices.map((data) =>
                          Math.round(data.totalAmount)
                        ),
                        label: "Order Amount",
                        id: "pvId",
                        stack: "total",
                      },
                      // { data: uData, label: "uv", id: "uvId", stack: "total" },
                    ]}
                    xAxis={[
                      {
                        data: invoiceData.invoices.map(
                          (data) => data.supplier.name
                        ),
                        scaleType: "band",
                      },
                    ]}
                    colors={["#EEA6A8", "#82ca9d"]}
                    sx={{
                      border: `1px solid rgba(${
                        theme === "dark" ? "255,255,255" : "0, 0, 0"
                      }, 0.1)`,
                      [`.${axisClasses.root}`]: {
                        [`.${axisClasses.tick}, .${axisClasses.line}`]: {
                          stroke: theme === "dark" ? "white" : "#878E9B",
                          strokeWidth: 1,
                        },
                        [`.${axisClasses.tickLabel}`]: {
                          fill: theme === "dark" ? "white" : "#878E9B",
                        },
                      },
                    }}
                  />
                </Item>
              </Grid>
            </Grid>
          </Box>
          <div className='flex-wrap flex gap-4 justify-between mt-8 md:mr-12 mr-7'>
            {/* 1st box */}
            <div className='bg-gray-100 flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
              <div className='flex justify-between'>
                <div className=''>
                  <h3 className='text-gray-500 text-md uppercase'>
                    Total Orders
                  </h3>
                  <p className='text-2xl'>{invoiceData.totalInvoices}</p>
                </div>
                <FaShoppingCart className='bg-yellow-300 text-slate-700 rounded-full text-5xl m-3 p-2 shadow-lg' />
              </div>
              <div className='flex  gap-2 text-sm'>
                <span className='text-green-500 flex items-center'>
                  <HiArrowNarrowUp />
                  {invoiceData.lastMonthInvoices}
                </span>
                <div className='text-gray-500'>Last month</div>
              </div>
            </div>
            {/* 2nd box */}
            <div className='bg-gray-100 flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
              <div className='flex justify-between'>
                <div className=''>
                  <h3 className='text-gray-500 text-md uppercase'>
                    Total Order Amounts
                  </h3>
                  <p className='text-2xl'>{`₹ ${invoiceData.totalOrderAmounts} /-`}</p>
                </div>
                <FaRupeeSign className='bg-red-600  text-white rounded-full text-5xl m-3 p-1 shadow-lg' />
              </div>
              <div className='flex  gap-2 text-sm'>
                <span className='text-green-500 flex items-center'>
                  <HiArrowNarrowUp />
                  {`₹ ${invoiceData.lastMonthOrderAmounts} /-`}
                </span>
                <div className='text-gray-500'>Last month</div>
              </div>
            </div>
            {/* 3rd box */}
            <div className='bg-gray-100 flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
              <div className='flex justify-between'>
                <div className=''>
                  <h3 className='text-gray-500 text-md uppercase'>
                    Total Customers
                  </h3>
                  <p className='text-2xl'>{customers.totalCustomers}</p>
                </div>
                <HiOutlineUserGroup className='bg-teal-600  text-white rounded-full text-5xl m-3 p-1 shadow-lg' />
              </div>
              <div className='flex  gap-2 text-sm'>
                <span className='text-green-500 flex items-center'>
                  <HiArrowNarrowUp />
                  {customers.lastMonthCustomers}
                </span>
                <div className='text-gray-500'>Last month</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default DashboardComp;
