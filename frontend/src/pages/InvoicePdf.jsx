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
    fontFamily: "Helvetica",
    lineHeight: 1.5,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    marginBottom: 2,
  },
  header: {
    fontSize: 12,
    fontWeight: "bold",
  },
  text: {
    marginBottom: 4,
    fontSize: 8,
  },
  bold: {
    fontWeight: "bold",
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginTop: 4,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "11%",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderBottomColor: "#000",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: "#e0e0e0",
    textAlign: "center",
    padding: 5,
    fontSize: 10,
  },
  tableCol: {
    width: "11%",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    textAlign: "center",
    padding: 5,
    fontSize: 10,
  },
  signatureSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    paddingRight: 10,
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    borderTopWidth: 0,
  },
  signatureImage: {
    width: 120, // equivalent to w-48 (48 * 4px)
    height: 30, // equivalent to h-10 (10 * 4px)
    borderWidth: 1, // equivalent to border-[2px]
    borderStyle: "solid",
    borderColor: "#bfbfbf",
  },
  signatureText: {
    marginTop: 10,
    fontSize: 12,
  },
  mainSection: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  invoiceHeaderContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    whiteSpace: "nowrap",
    fontSize: 14, // equivalent to text-lg
    paddingLeft: 28, // equivalent to pl-7
    fontWeight: "semibold",
    color: "black",
  },
  invoiceHeaderContainerMd: {
    "@media (min-width: 768px)": {
      fontSize: 20, // equivalent to md:text-xl
    },
  },
  abcBox: {
    backgroundColor: "#3b82f6", // bg-blue-500
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    paddingTop: 6,
    paddingHorizontal: 4, // equivalent to px-1
    fontWeight: "bold",
    fontSize: 14, // equivalent to text-lg
  },
  abcBoxMd: {
    "@media (min-width: 768px)": {
      fontSize: 20, // equivalent to md:text-xl
    },
  },
  invoiceBox: {
    backgroundColor: "#ff5555",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    paddingTop: 6,
    paddingHorizontal: 4, // equivalent to px-1
    fontWeight: "bold",
    fontSize: 14, // equivalent to text-lg
  },
  invoiceBoxMd: {
    "@media (min-width: 768px)": {
      fontSize: 20, // equivalent to md:text-xl
    },
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  heading: {
    fontSize: 14, // equivalent to text-lg
    color: "black",
  },
  headingMd: {
    "@media (min-width: 768px)": {
      fontSize: 24, // equivalent to md:text-2xl
    },
  },
  subheading: {
    fontSize: 12, // equivalent to text-base or h4 in Tailwind
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
          console.log(data.invoices[0].supplier.signature);
          setInvoiceFound(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchInvoice();
  }, [orderNumber]);

  return (
    invoiceFound && (
      <Document>
        <Page size='A4' style={styles.page}>
          <View style={styles.title}>
            <Text>Invoice</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingBottom: 4,
              borderStyle: "solid",
              borderColor: "#bfbfbf",
              borderBottomWidth: 1,
              marginBottom: 10,
            }}
          >
            <View
              style={[
                styles.invoiceHeaderContainer,
                styles.invoiceHeaderContainerMd,
              ]}
            >
              <Text style={[styles.abcBox, styles.abcBoxMd]}>ABC</Text>
              <Text style={[styles.invoiceBox, styles.invoiceBoxMd]}>
                INVOICE
              </Text>
            </View>
            <View style={styles.container}>
              <Text style={[styles.heading, styles.headingMd]}>
                Tax Invoice/Bill of Supply/Case Memo
              </Text>
              <Text style={styles.subheading}>(Original for Recipient)</Text>
            </View>
          </View>
          <View style={styles.mainSection}>
            <View style={styles.section}>
              <Text style={styles.header}>Sold By:</Text>
              <Text style={{ fontWeight: "bold", fontSize: 9 }}>
                {invoiceData.supplier.name}
              </Text>
              <Text style={styles.text}>{invoiceData.supplier.address}</Text>
              <Text style={styles.text}>
                {invoiceData.supplier.state}, {invoiceData.supplier.country}
              </Text>
              <Text style={styles.text}>
                <Text style={{ fontWeight: "bold", fontSize: 9 }}>PAN No:</Text>{" "}
                {invoiceData.supplier.PAN}
              </Text>
              <Text style={styles.text}>
                <Text style={{ fontWeight: "bold", fontSize: 9 }}>
                  GST Regd. No:
                </Text>{" "}
                {invoiceData.supplier.GST}
              </Text>
            </View>
            <View>
              <View
                style={{
                  marginBottom: 10,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <Text style={styles.header}>Billing Address:</Text>
                <Text style={{ fontWeight: "bold", fontSize: 9 }}>
                  {invoiceData.customer.name}
                </Text>
                <Text style={styles.text}>{invoiceData.customer.address}</Text>
                <Text style={styles.text}>
                  {invoiceData.customer.state}, {invoiceData.customer.country}
                </Text>
              </View>
              <View
                style={{
                  marginBottom: 10,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <Text style={styles.header}>Shipping Address:</Text>
                <Text style={{ fontWeight: "bold", fontSize: 9 }}>
                  {invoiceData.customer.name}
                </Text>
                <Text style={styles.text}>{invoiceData.customer.address}</Text>
                <Text style={styles.text}>
                  {invoiceData.customer.state}, {invoiceData.customer.country}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.mainSection}>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <Text>
                <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                  Order Number:
                </Text>{" "}
                <Text style={{ fontSize: 8 }}>{invoiceData.orderNumber}</Text>
              </Text>
              <Text style={styles.text}>
                <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                  Order Date:
                </Text>{" "}
                <Text style={{ fontSize: 8 }}>
                  {new Date(invoiceData.createdAt).toLocaleDateString()}
                </Text>
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                justifyContent: "flex-end",
              }}
            >
              <Text style={styles.text}>
                <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                  Place of Supply:
                </Text>{" "}
                {invoiceData.placeOfSupply}
              </Text>
              <Text style={styles.text}>
                <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                  Place of Delivery:
                </Text>{" "}
                {invoiceData.placeOfDelivery}
              </Text>
              <Text style={styles.text}>
                <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                  Invoice Number:
                </Text>{" "}
                {invoiceData._id}
              </Text>
              <Text style={styles.text}>
                <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                  Invoice Date:
                </Text>{" "}
                {new Date(invoiceData.createdAt).toLocaleDateString()}
              </Text>
            </View>
          </View>
          <Text style={{ fontWeight: "bold", fontSize: 12, marginTop: 4 }}>
            Order Details:
          </Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={{ ...styles.tableColHeader, width: "7%" }}>
                Sl no
              </Text>
              <Text style={{ ...styles.tableColHeader, width: "22%" }}>
                Description
              </Text>
              <Text style={{ ...styles.tableColHeader, width: "7%" }}>Qty</Text>
              <Text style={{ ...styles.tableColHeader, width: "10%" }}>
                Unit Price(Rs.)
              </Text>
              <Text style={{ ...styles.tableColHeader, width: "10%" }}>
                Discount(%)
              </Text>
              <Text style={{ ...styles.tableColHeader, width: "12%" }}>
                Net Amount(Rs.)
              </Text>
              <Text style={{ ...styles.tableColHeader, width: "10%" }}>
                Tax Rate(%)
              </Text>
              <Text style={{ ...styles.tableColHeader, width: "12%" }}>
                Tax Type
              </Text>
              <Text style={{ ...styles.tableColHeader, width: "12%" }}>
                Total Amount(Rs.)
              </Text>
            </View>
            {invoiceData.items.map((item, index) => (
              <View style={styles.tableRow} key={item._id}>
                <Text style={{ ...styles.tableCol, width: "7%" }}>
                  {index + 1}
                </Text>
                <Text style={{ ...styles.tableCol, width: "22%" }}>
                  {item.description}
                </Text>
                <Text style={{ ...styles.tableCol, width: "7%" }}>
                  {item.quantity}
                </Text>
                <Text style={{ ...styles.tableCol, width: "10%" }}>
                  {item.unitPrice}
                </Text>
                <Text style={{ ...styles.tableCol, width: "10%" }}>
                  {item.discount}
                </Text>
                <Text style={{ ...styles.tableCol, width: "12%" }}>
                  {item.netAmount}
                </Text>
                <Text style={{ ...styles.tableCol, width: "10%" }}>
                  {item.taxRate}
                </Text>
                <Text style={{ ...styles.tableCol, width: "12%" }}>
                  {item.taxType}
                </Text>
                <Text style={{ ...styles.tableCol, width: "12%" }}>
                  {item.totalAmount.toFixed(2)}
                </Text>
              </View>
            ))}
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
              borderStyle: "solid",
              borderColor: "#bfbfbf",
              borderWidth: 1,
              borderTopWidth: 0,
              paddingVertical: 4,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 2,
                paddingTop: 4,
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 10 }}>Total:</Text>
              <Text
                style={{ fontSize: 10 }}
              >{`INR ${invoiceData.totalAmount.toFixed(2)} /-`}</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                borderStyle: "solid",
                borderColor: "#bfbfbf",
                borderTopWidth: 1,
                paddingTop: 6,
                paddingHorizontal: 2,
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                Amount in words:
              </Text>{" "}
              <Text style={{ fontSize: 9 }}>{invoiceData.amountInWords}</Text>
            </View>
          </View>
          <View style={styles.signatureSection}>
            <Text style={styles.signatureText}>
              {invoiceData.supplier.name}
            </Text>
            <View style={{ height: 30, width: 120 }}>
              <Image
                src={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9cWvAUHp74jMgojzlv2LCgIrPYze7-mqnYQ&s"
                }
                style={styles.signatureImage}
              />
            </View>
            <Text style={styles.signatureText}>Authorized Signatory</Text>
          </View>
        </Page>
      </Document>
    )
  );
}

export default InvoicePdf;
