import React, { useEffect, useState } from "react";
import { BackgroundGradient } from "../components/ui/background-gradient";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Table } from "flowbite-react";
import CustomizedProgressBars from "../components/spinner/CustomizedProgressBars";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePdf from "./InvoicePdf";
import { Button } from "../components/ui/moving-border";
function ViewInvoice() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const { orderNumber } = useParams();
  const [invoiceData, setInvoiceData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [invoiceFound, setInvoiceFound] = useState(false);
  const [invoiceDataFetched, setInvoiceDataFetched] = useState(false);

  useEffect(() => {
    const fetchInvoice = async () => {
      setInvoiceDataFetched(true);
      try {
        const res = await fetch(
          `/api/invoice/getInvoices?orderNumber=${orderNumber}`
        );
        const data = await res.json();
        if (!res.ok) {
          setErrorMessage("Data not found");
          setInvoiceDataFetched(false);
        }
        if (res.ok) {
          setInvoiceData(data.invoices[0]);
          setInvoiceDataFetched(false);
          setInvoiceFound(true);
        }
      } catch (error) {
        setErrorMessage(error.message);
        setInvoiceFound(false);
      }
    };
    if (currentUser) {
      fetchInvoice();
    }
  }, [currentUser._id]);

  return (
    <div className='mx-auto p-4 md:p-10 overflow-x-auto scrollbar scrollbar-track-slate-700 scrollbar-thumb-black dark:scrollbar-track-slate-400 dark:scrollbar-thumb-white'>
      {invoiceDataFetched ? (
        <div className='flex justify-center items-center gap-4 h-screen'>
          <CustomizedProgressBars />
          <span className='text-2xl'>Loading....</span>
        </div>
      ) : (
        invoiceFound && (
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
                <div className='dark:text-[#878E9B]'>
                  <span className='text-xl font-semibold'>Sold By:</span>
                  <p>{invoiceData.supplier.name}</p>
                  <p className='text-sm'>{invoiceData.supplier.address}</p>
                  <p>
                    {invoiceData.supplier.state} &nbsp;
                    {invoiceData.supplier.country}
                  </p>
                  <p className='mt-3'>
                    <span className='font-semibold'>PAN No:&nbsp;</span>
                    {invoiceData.supplier.PAN}
                  </p>
                  <p>
                    <span className='font-semibold'>GST Regd. No:&nbsp;</span>
                    {invoiceData.supplier.GST}
                  </p>
                </div>
              </div>
              {/* Customer Details / 2nd Grid */}
              <div className=''>
                <div className='dark:text-[#878E9B]'>
                  <div className='flex flex-col items-end'>
                    <span className='text-xl font-semibold'>
                      Billing Address:
                    </span>
                    <p>{invoiceData.customer.name}</p>
                    <p className='text-sm'>{invoiceData.customer.address}</p>
                    <p>
                      {invoiceData.customer.state} &nbsp;{" "}
                      {invoiceData.customer.country}
                    </p>
                  </div>
                  <hr />
                  <div className='flex flex-col items-end'>
                    <span className='text-xl font-semibold mt-5'>
                      Shipping Address:
                    </span>
                    <p>{invoiceData.customer.name}</p>
                    <p className='text-sm'>{invoiceData.customer.address}</p>
                    <p>
                      {invoiceData.customer.state} &nbsp;{" "}
                      {invoiceData.customer.country}
                    </p>
                  </div>
                </div>
              </div>
              {/* 3rd Grid */}

              <div className='flex flex-col justify-end dark:text-[#878E9B]'>
                <h3>
                  <span className='font-bold tracking-tighter'>
                    Order Number:&nbsp;
                  </span>
                  {invoiceData.orderNumber}
                </h3>
                <h3>
                  <span className='font-bold tracking-tighter'>
                    Order Date:&nbsp;
                  </span>
                  {new Date(invoiceData.createdAt).toLocaleDateString()}
                </h3>
              </div>

              {/* 4th Grid */}

              <div className='flex flex-col gap-2'>
                <div className='flex flex-col items-end dark:text-[#878E9B]'>
                  <h3>
                    <span className='font-bold tracking-tighter'>
                      Place of Supply:&nbsp;
                    </span>
                    {invoiceData.placeOfSupply}
                  </h3>
                  <h3>
                    <span className='font-bold tracking-tighter'>
                      Place of Delivery:&nbsp;
                    </span>
                    {invoiceData.placeOfDelivery}
                  </h3>
                </div>
                <div className='flex flex-col items-end dark:text-[#878E9B]'>
                  <h3>
                    <span className='font-bold tracking-tighter'>
                      Invoice Number:&nbsp;
                    </span>
                    {invoiceData._id}
                  </h3>
                  <h3>
                    <span className='font-bold tracking-tighter'>
                      Invoice Date:&nbsp;
                    </span>
                    {new Date(invoiceData.createdAt).toLocaleDateString()}
                  </h3>
                </div>
              </div>
            </div>
            {/* Table */}
            <div className='table-auto overflow-x-scroll md:mx-auto scrollbar md:overflow-x-hidden  scrollbar-track-gray-400 scrollbar-thumb-slate-500 dark:scrollbar-track-slate-400 dark:scrollbar-thumb-white mt-5'>
              <Table hoverable className='shadow-md'>
                <Table.Head>
                  <Table.HeadCell className='bg-[#abb1bb]'>
                    Sl no
                  </Table.HeadCell>
                  <Table.HeadCell className='bg-[#abb1bb]'>
                    Description
                  </Table.HeadCell>
                  <Table.HeadCell className='bg-[#abb1bb]'>Qty</Table.HeadCell>
                  <Table.HeadCell className='bg-[#abb1bb]'>
                    Unit Price(₹)
                  </Table.HeadCell>
                  <Table.HeadCell className='bg-[#abb1bb]'>
                    Discount(%)
                  </Table.HeadCell>
                  <Table.HeadCell className='bg-[#abb1bb]'>
                    Net Amount(₹)
                  </Table.HeadCell>
                  <Table.HeadCell className='bg-[#abb1bb]'>
                    Tax Rate(%)
                  </Table.HeadCell>
                  <Table.HeadCell className='bg-[#abb1bb]'>
                    Tax Type
                  </Table.HeadCell>
                  <Table.HeadCell className='bg-[#abb1bb]'>
                    Total Amount
                  </Table.HeadCell>
                </Table.Head>
                {invoiceData.items.map((item, index) => (
                  <>
                    <Table.Body className='divide-y' key={item._id}>
                      <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800 '>
                        <Table.Cell>{index + 1}</Table.Cell>
                        <Table.Cell>{item.description}</Table.Cell>
                        <Table.Cell>{item.quantity}</Table.Cell>
                        <Table.Cell>{item.unitPrice}</Table.Cell>
                        <Table.Cell>{item.discount}</Table.Cell>
                        <Table.Cell>{item.netAmount}</Table.Cell>
                        <Table.Cell>{item.taxRate}</Table.Cell>
                        <Table.Cell>{item.taxType}</Table.Cell>
                        <Table.Cell>{item.totalAmount}</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </>
                ))}
              </Table>
            </div>
            {/* Total Amount */}
            <div
              className={`w-full pl-1 border-[1px] border-opacity-35 ${
                theme === "dark"
                  ? "dark:border-opacity-55 border-white dark:bg-slate-800"
                  : "border-black bg-white"
              } flex-col items-start gap-2`}
            >
              <div className='w-full py-2 text-xl font-semibold tracking-tighter flex justify-between pr-5'>
                <span>Total: </span>
                <span className='text-md dark:text-[#878E9B]'>{`₹ ${invoiceData.totalAmount.toFixed(
                  2
                )} /-`}</span>
              </div>
              <hr />
              <div className='w-full py-2 md:text-xl font-semibold tracking-tighter flex flex-wrap justify-between pr-5'>
                <span>Amount in words: </span>
                <span className='text-sm md:text-[18px] font-light dark:text-[#878E9B]'>
                  {invoiceData.amountInWords}
                </span>
              </div>
            </div>

            {/* Supplier Name and Signature */}
            <div className='w-full pr-1 border-[1px] border-opacity-35 dark:border-opacity-55 border-solid border-black dark:border-white dark:bg-slate-800 flex flex-col items-end gap-2'>
              <span className='font-bold text-xl dark:text-[#878E9B]'>
                {invoiceData.supplier.name}
              </span>
              <img
                src={invoiceData.supplier.signature}
                alt={invoiceData.supplier.name}
                className='w-48 h-10 border-[2px] border-solid border-black dark:border-white dark:bg-slate-800'
              />
              <span className='font-bold text-xl dark:text-[#878E9B]'>
                Authorized Signatory
              </span>
            </div>

            {errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )}
            <div className='flex justify-end mr-10 mt-3'>
              <Button
                borderRadius='4px'
                className='bg-transparent text-white border-slate-800 h-10 rounded-[3px]'
              >
                <PDFDownloadLink
                  document={<InvoicePdf orderNumber={orderNumber} />}
                  fileName='invoice.pdf'
                >
                  {({ loading }) =>
                    loading ? <CustomizedProgressBars /> : "Download PDF"
                  }
                </PDFDownloadLink>
              </Button>
            </div>
          </BackgroundGradient>
        )
      )}
    </div>
  );
}

export default ViewInvoice;
