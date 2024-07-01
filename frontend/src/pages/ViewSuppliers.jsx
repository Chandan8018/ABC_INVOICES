import { Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Spotlight } from "../components/ui/Spotlight";
import { Button } from "../components/ui/moving-border";
import { Supplier, NoSupplier } from "../data/data";
import { TypewriterEffectSmooth } from "../components/ui/typewriter-effect";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SaveIcon from "@mui/icons-material/Save";

function ViewSuppliers() {
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.theme);
  const { currentUser } = useSelector((state) => state.user);
  const [suppliers, setSuppliers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [supplierIdToDelete, setSupplierIdToDelete] = useState("");
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const res = await fetch(`/api/supplier/getSuppliers`);
        const data = await res.json();
        if (res.ok) {
          setSuppliers(data.suppliers);
          if (data.suppliers.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser) {
      fetchSuppliers();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = suppliers.length;
    try {
      const res = await fetch(
        `/api/supplier/getSuppliers?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.suppliers]);
        if (data.suppliers.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeletesupplier = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/supplier/delete/${supplierIdToDelete}/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setSuppliers((prev) =>
          prev.filter((supplier) => supplier._id !== supplierIdToDelete)
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
            <TypewriterEffectSmooth words={Supplier} />
          </div>

          {currentUser && suppliers.length > 0 ? (
            <>
              <Table hoverable className='shadow-md'>
                <Table.Head>
                  <Table.HeadCell className='bg-[#abb1bb]'>
                    Sl no
                  </Table.HeadCell>
                  <Table.HeadCell className='bg-[#abb1bb]'>Name</Table.HeadCell>
                  <Table.HeadCell className='bg-[#abb1bb]'>
                    GST No.
                  </Table.HeadCell>
                  <Table.HeadCell className='bg-[#abb1bb]'>
                    PAN No.
                  </Table.HeadCell>
                  <Table.HeadCell className='bg-[#abb1bb]'>
                    Supplier Signature
                  </Table.HeadCell>
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
                {suppliers.map((supplier, index) => (
                  <>
                    <Table.Body className='divide-y' key={supplier._id}>
                      <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800 '>
                        <Table.Cell>{index + 100}</Table.Cell>
                        <Table.Cell>{supplier.name}</Table.Cell>
                        <Table.Cell>{supplier.GST}</Table.Cell>
                        <Table.Cell>{supplier.PAN}</Table.Cell>
                        <Table.Cell>
                          {
                            <img
                              src={supplier.signature}
                              alt={`${supplier.name} signature`}
                              className='rounded-sm w-40'
                            />
                          }
                        </Table.Cell>
                        <Table.Cell>{supplier.phone}</Table.Cell>
                        <Table.Cell>{supplier.email}</Table.Cell>
                        <Table.Cell>{supplier.address}</Table.Cell>
                        <Table.Cell>{supplier.state}</Table.Cell>
                        <Table.Cell>{supplier.country}</Table.Cell>

                        <Table.Cell>
                          <Button
                            borderRadius='1.75rem'
                            className='bg-transparent text-black dark:text-white border-neutral-200 dark:border-slate-800 h-8 cursor-pointer'
                            type='button'
                            onClick={() => {
                              setShowModal(true);
                              setSupplierIdToDelete(supplier._id);
                            }}
                          >
                            <MdDelete className='w-7 h-7 text-[#ff5555]' />
                          </Button>
                        </Table.Cell>
                        <Table.Cell>
                          <Link
                            to={`/update-supplier/${supplier._id}`}
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
          ) : (
            <div className='flex flex-col items-center gap-10 mt-10'>
              <h1 className='text-5xl font-bold'>No Suppliers Found</h1>
              <h3 className='text-2xl font-semibold'>
                Add a new Supplier just click on below right side add button.
              </h3>
            </div>
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
                  Are you sure you want to delete this Supplier?
                </h3>
                <div className='flex justify-center gap-4'>
                  <Button
                    borderRadius='4px'
                    className='bg-red-500 text-white border-slate-800 h-10 rounded-[3px]'
                    onClick={handleDeletesupplier}
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
            onClick={() => navigate("/dashboard?tab=add-supplier")}
            key={"Add supplier"}
            icon={<SaveIcon />}
            tooltipTitle={"Add supplier"}
          />
        </SpeedDial>
      </Box>
    </>
  );
}

export default ViewSuppliers;
