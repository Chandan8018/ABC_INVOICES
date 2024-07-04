import React, { useEffect, useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    lineHeight: 1.5,
    flexDirection: "column",
  },
  section: {
    marginBottom: 10,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    width: "12.5%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },
  tableCell: {
    margin: "auto",
    fontSize: 10,
  },
});
function InvoicePdf({ orderNumber }) {
  const [invoiceData, setInvoiceData] = useState({});
  const [invoiceFound, setInvoiceFound] = useState(false);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await fetch(
          `/api/invoice/getInvoices?orderNumber=${orderNumber}`
        );
        const data = await res.json();
        if (res.ok) {
          setInvoiceData(data.invoices[0]);
          setInvoiceFound(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchInvoice();
  }, [orderNumber]);

  return (
    <Document>
      <Page style={styles.page}>
        {invoiceFound && (
          <>
            <View style={styles.header}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                ABC INVOICE
              </Text>
              <Text style={{ textAlign: "right" }}>
                Tax Invoice/Bill of Supply/Case Memo (Original for Recipient)
              </Text>
            </View>
            <View style={styles.section}>
              <Text>Sold By:</Text>
              <Text>{invoiceData.supplier?.name}</Text>
              <Text>{invoiceData.supplier?.address}</Text>
              <Text>
                {invoiceData.supplier?.state} {invoiceData.supplier?.country}
              </Text>
              <Text>PAN No: {invoiceData.supplier?.PAN}</Text>
              <Text>GST Regd. No: {invoiceData.supplier?.GST}</Text>
            </View>
            <View style={styles.section}>
              <Text style={{ textAlign: "right" }}>Billing Address:</Text>
              <Text style={{ textAlign: "right" }}>
                {invoiceData.customer?.name}
              </Text>
              <Text style={{ textAlign: "right" }}>
                {invoiceData.customer?.address}
              </Text>
              <Text style={{ textAlign: "right" }}>
                {invoiceData.customer?.state} {invoiceData.customer?.country}
              </Text>
            </View>
            <View style={styles.section}>
              <Text>Order Number: {invoiceData.orderNumber}</Text>
              <Text>
                Order Date:{" "}
                {new Date(invoiceData.createdAt).toLocaleDateString()}
              </Text>
            </View>
            <View style={styles.section}>
              <Text>Place of Supply: {invoiceData.placeOfSupply}</Text>
              <Text>Place of Delivery: {invoiceData.placeOfDelivery}</Text>
              <Text>Invoice Number: {invoiceData._id}</Text>
              <Text>
                Invoice Date:{" "}
                {new Date(invoiceData.createdAt).toLocaleDateString()}
              </Text>
            </View>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={styles.tableCol}>Sl no</Text>
                <Text style={styles.tableCol}>Description</Text>
                <Text style={styles.tableCol}>Qty</Text>
                <Text style={styles.tableCol}>Unit Price(₹)</Text>
                <Text style={styles.tableCol}>Discount(%)</Text>
                <Text style={styles.tableCol}>Net Amount(₹)</Text>
                <Text style={styles.tableCol}>Tax Rate(%)</Text>
                <Text style={styles.tableCol}>Tax Type</Text>
                <Text style={styles.tableCol}>Total Amount</Text>
              </View>
              {invoiceData.items?.map((item, index) => (
                <View style={styles.tableRow} key={item._id}>
                  <Text style={styles.tableCol}>{index + 1}</Text>
                  <Text style={styles.tableCol}>{item.description}</Text>
                  <Text style={styles.tableCol}>{item.quantity}</Text>
                  <Text style={styles.tableCol}>{item.unitPrice}</Text>
                  <Text style={styles.tableCol}>{item.discount}</Text>
                  <Text style={styles.tableCol}>{item.netAmount}</Text>
                  <Text style={styles.tableCol}>{item.taxRate}</Text>
                  <Text style={styles.tableCol}>{item.taxType}</Text>
                  <Text style={styles.tableCol}>
                    {Math.round(item.totalAmount)}
                  </Text>
                </View>
              ))}
            </View>
            <View style={styles.section}>
              <Text>
                Total: {`₹ ${invoiceData.totalAmount?.toFixed(2)}`} /-
              </Text>
              <Text>Amount in words: {invoiceData.amountInWords}</Text>
            </View>
            <View style={{ textAlign: "right", marginTop: 10 }}>
              <Text>{invoiceData.supplier?.name}</Text>
              {invoiceData.supplier?.signature && (
                <Image
                  src={invoiceData.supplier.signature}
                  style={{ width: 100, height: 40 }}
                />
              )}
              <Text>Authorized Signatory</Text>
            </View>
          </>
        )}
      </Page>
    </Document>
  );
}

export default InvoicePdf;
