import { Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Spotlight } from "../components/ui/Spotlight";
import { Button } from "../components/ui/moving-border";
import { View } from "../data/data";
import { TypewriterEffectSmooth } from "../components/ui/typewriter-effect";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SaveIcon from "@mui/icons-material/Save";

function ViewCustomers() {
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.theme);
  const { currentUser } = useSelector((state) => state.user);
  const [customers, setCustomers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [customerIdToDelete, setCustomerIdToDelete] = useState("");
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch(`/api/customer/getCustomers`);
        const data = await res.json();
        if (res.ok) {
          console.log(data);
          const modifiedData = data.customers.filter(
            (customer) => currentUser._id === customer.userId
          );
          setCustomers(modifiedData);
          if (modifiedData.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser) {
      fetchCustomers();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = customers.length;
    try {
      const res = await fetch(
        `/api/customer/getCustomers?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.customers]);
        if (customers.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteQize = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/customer/delete/${customerIdToDelete}/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setCustomers((prev) =>
          prev.filter((customer) => customer._id !== customerIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div className='min-h-screen w-[92vw] dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex justify-center'>
        <Spotlight
          className='-top-40 left-0 md:left-60 md:-top-20 z-10'
          fill={theme === "dark" ? "white" : "#13C6F7"}
        />
        <div className='absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]'></div>

        <div className='table-auto overflow-x-scroll md:mx-auto scrollbar scrollbar-track-slate-700 scrollbar-thumb-black dark:scrollbar-track-slate-400 dark:scrollbar-thumb-white mb-5'>
          <div className='flex justify-center'>
            <TypewriterEffectSmooth words={View} />
          </div>

          {currentUser && customers.length > 0 && (
            <>
              <Table hoverable className='shadow-md'>
                <Table.Head>
                  <Table.HeadCell className='bg-[#abb1bb]'>
                    Sl no
                  </Table.HeadCell>
                  <Table.HeadCell className='bg-[#abb1bb]'>Name</Table.HeadCell>
                  <Table.HeadCell className='bg-[#abb1bb]'>
                    Phone No.
                  </Table.HeadCell>
                  <Table.HeadCell className='bg-[#abb1bb]'>
                    Email
                  </Table.HeadCell>
                  <Table.HeadCell className='bg-[#abb1bb]'>
                    Address
                  </Table.HeadCell>
                  <Table.HeadCell className='bg-[#abb1bb]'>
                    State
                  </Table.HeadCell>
                  <Table.HeadCell className='bg-[#abb1bb]'>
                    Country
                  </Table.HeadCell>
                  <Table.HeadCell className='bg-[#abb1bb]'>
                    Delete
                  </Table.HeadCell>
                  <Table.HeadCell className='bg-[#abb1bb]'>Edit</Table.HeadCell>
                </Table.Head>
                {customers.map((customer, index) => (
                  <>
                    <Table.Body className='divide-y' key={customer._id}>
                      <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800 '>
                        <Table.Cell>{index + 100}</Table.Cell>
                        <Table.Cell>{customer.name}</Table.Cell>
                        <Table.Cell>{customer.phone}</Table.Cell>
                        <Table.Cell>{customer.email}</Table.Cell>
                        <Table.Cell>{customer.address}</Table.Cell>
                        <Table.Cell>{customer.state}</Table.Cell>
                        <Table.Cell>{customer.country}</Table.Cell>
                        <Table.Cell>
                          <Button
                            borderRadius='1.75rem'
                            className='bg-transparent text-black dark:text-white border-neutral-200 dark:border-slate-800 h-8 cursor-pointer'
                            type='button'
                            onClick={() => {
                              setShowModal(true);
                              setCustomerIdToDelete(customer._id);
                            }}
                          >
                            <MdDelete className='w-7 h-7 text-[#ff5555]' />
                          </Button>
                        </Table.Cell>
                        <Table.Cell>
                          <Link
                            to={`/update-customer/${customer._id}`}
                            className='text-teal-500'
                          >
                            <Button
                              borderRadius='1.75rem'
                              className='bg-transparent text-black dark:text-white border-neutral-200 dark:border-slate-800 h-8 w-8 cursor-pointer'
                              type='button'
                            >
                              <FaEdit className='w-6 h-6 text-blue-500' />
                            </Button>
                          </Link>
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </>
                ))}
              </Table>
              {showMore && (
                <button
                  onClick={handleShowMore}
                  className='w-full text-black dark:text-teal-500 font-bold self-center text-sm py-7 hover:text-blue-600'
                >
                  Show more
                </button>
              )}
            </>
          )}
          <Modal
            show={showModal}
            onClose={() => setShowModal(false)}
            popup
            size='md'
          >
            <Modal.Header />
            <Modal.Body>
              <div className='text-center'>
                <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
                <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                  Are you sure you want to delete this Customer?
                </h3>
                <div className='flex justify-center gap-4'>
                  <Button
                    borderRadius='4px'
                    className='bg-red-500 text-white border-slate-800 h-10 rounded-[3px]'
                    onClick={handleDeleteQize}
                  >
                    Yes, I'm sure
                  </Button>
                  <Button
                    borderRadius='4px'
                    className='bg-transparent dark:text-white text-black border-slate-800 h-10 rounded-[3px]'
                    onClick={() => setShowModal(false)}
                  >
                    No, cancel
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
      <Box sx={{ height: 320, transform: "translateZ(0px)", flexGrow: 1 }}>
        <SpeedDial
          ariaLabel='SpeedDial basic example'
          sx={{ position: "absolute", top: 350, right: 16 }}
          icon={<SpeedDialIcon />}
        >
          <SpeedDialAction
            onClick={() => navigate("/dashboard?tab=add-customer")}
            key={"Add Customer"}
            icon={<SaveIcon />}
            tooltipTitle={"Add Customer"}
          />
        </SpeedDial>
      </Box>
    </>
  );
}

export default ViewCustomers;
