import React, { useEffect, useState } from "react";
import { Spotlight } from "../components/ui/Spotlight";
import { TypewriterEffectSmooth } from "../components/ui/typewriter-effect";
import CustomizedProgressBars from "../components/spinner/CustomizedProgressBars";
import { Modal, Table } from "flowbite-react";
import { Button } from "../components/ui/moving-border";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { View } from "../data/data";
import { MdDelete } from "react-icons/md";

function AllInvoices() {
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.theme);
  const { currentUser } = useSelector((state) => state.user);
  const [invoicesData, setInvoicesData] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [invoiceIdToDelete, setInvoiceIdToDelete] = useState("");
  const [fetchInvoicesSuccess, setFetchInvoicesSuccess] = useState(false);

  useEffect(() => {
    const fetchInvoices = async () => {
      setFetchInvoicesSuccess(true);
      try {
        const res = await fetch(`/api/invoice/getInvoices`);
        const data = await res.json();
        if (res.ok) {
          setInvoicesData(data.invoices);
          setFetchInvoicesSuccess(false);
          if (data.invoices.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser) {
      fetchInvoices();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = customers.length;
    try {
      const res = await fetch(
        `/api/invoice/getInvoices?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setInvoicesData((prev) => [...prev, ...data.invoices]);
        if (data.invoices.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteInvoice = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/invoice/delete/${invoiceIdToDelete}/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setInvoicesData((prev) =>
          prev.filter((invoice) => invoice._id !== invoiceIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
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

        {fetchInvoicesSuccess ? (
          <div className='flex justify-center items-center gap-4 h-screen'>
            <CustomizedProgressBars />
            <span className='text-2xl'>Loading....</span>
          </div>
        ) : currentUser && invoicesData.length > 0 ? (
          <>
            <Table hoverable className='shadow-md'>
              <Table.Head>
                <Table.HeadCell className='bg-[#abb1bb]'>
                  Invoice No
                </Table.HeadCell>
                <Table.HeadCell className='bg-[#abb1bb]'>
                  Order Number
                </Table.HeadCell>
                <Table.HeadCell className='bg-[#abb1bb]'>
                  Order Date
                </Table.HeadCell>
                <Table.HeadCell className='bg-[#abb1bb]'>
                  Customer Name
                </Table.HeadCell>
                <Table.HeadCell className='bg-[#abb1bb]'>
                  Customer Id
                </Table.HeadCell>
                <Table.HeadCell className='bg-[#abb1bb]'>
                  Supplier Name
                </Table.HeadCell>
                <Table.HeadCell className='bg-[#abb1bb]'>
                  Supplier Id
                </Table.HeadCell>
                <Table.HeadCell className='bg-[#abb1bb]'>
                  Place Of Supply
                </Table.HeadCell>
                <Table.HeadCell className='bg-[#abb1bb]'>
                  Place Of Delivery
                </Table.HeadCell>
                <Table.HeadCell className='bg-[#abb1bb]'>
                  Total Amount
                </Table.HeadCell>
                <Table.HeadCell className='bg-[#abb1bb]'>Delete</Table.HeadCell>
              </Table.Head>
              {invoicesData.map((invoice) => (
                <>
                  <Table.Body className='divide-y' key={invoice._id}>
                    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800 '>
                      <Table.Cell>{invoice._id}</Table.Cell>
                      <Table.Cell>{invoice.orderNumber}</Table.Cell>
                      <Table.Cell>
                        {new Date(invoice.createdAt).toLocaleDateString()}
                      </Table.Cell>
                      <Table.Cell>{invoice.customer.name}</Table.Cell>
                      <Table.Cell>
                        {invoice.customer.customerId || "12345"}
                      </Table.Cell>
                      <Table.Cell>{invoice.supplier.name}</Table.Cell>
                      <Table.Cell>
                        {invoice.supplier.supplierId || "12345"}
                      </Table.Cell>
                      <Table.Cell>{invoice.placeOfSupply}</Table.Cell>
                      <Table.Cell>{invoice.placeOfDelivery}</Table.Cell>
                      <Table.Cell>{invoice.totalAmount}</Table.Cell>
                      <Table.Cell>
                        <Button
                          borderRadius='1.75rem'
                          className='bg-transparent text-black dark:text-white border-neutral-200 dark:border-slate-800 h-8 cursor-pointer'
                          type='button'
                          onClick={() => {
                            setShowModal(true);
                            setInvoiceIdToDelete(invoice._id);
                          }}
                        >
                          <MdDelete className='w-7 h-7 text-[#ff5555]' />
                        </Button>
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
            <h1 className='text-5xl font-bold'>No Invoices Found</h1>
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
                Are you sure you want to delete this invoice?
              </h3>
              <div className='flex justify-center gap-4'>
                <Button
                  borderRadius='4px'
                  className='bg-red-500 text-white border-slate-800 h-10 rounded-[3px]'
                  onClick={handleDeleteInvoice}
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
  );
}

export default AllInvoices;
