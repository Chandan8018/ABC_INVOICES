import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";

// Register font if needed
Font.register({
  family: "Roboto",
  fonts: [
    { src: "/path/to/Roboto-Regular.ttf" },
    { src: "/path/to/Roboto-Bold.ttf", fontWeight: "bold" },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "Roboto",
    padding: 40,
    fontSize: 12,
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 5,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  image: {
    width: 150,
    height: 40,
    marginBottom: 10,
  },
  signature: {
    width: 200,
    height: 50,
    marginTop: 10,
    border: "1px solid black",
  },
});

const InvoiceDocument = ({ invoiceData }) => {
  const { supplierDetails, customerDetails } = invoiceData;

  return (
    <Document>
      <Page size='A4' style={styles.page}>
        {/* Invoice Header */}
        <View style={styles.section}>
          <Image src='/path/to/company-logo.png' style={styles.image} />
          <Text style={styles.title}>Tax Invoice/Bill of Supply/Case Memo</Text>
          <Text>(Original for Recipient)</Text>
        </View>

        {/* Supplier Details */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Sold By:</Text>
          <Text style={styles.text}>{supplierDetails[0].name}</Text>
          <Text style={styles.text}>{supplierDetails[0].address}</Text>
          <Text style={styles.text}>
            {supplierDetails[0].state} {supplierDetails[0].country}
          </Text>
          <Text style={styles.text}>PAN No: {supplierDetails[0].PAN}</Text>
          <Text style={styles.text}>
            GST Regd. No: {supplierDetails[0].GST}
          </Text>
        </View>

        {/* Customer Details */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Billing Address:</Text>
          <Text style={styles.text}>{customerDetails[0].name}</Text>
          <Text style={styles.text}>{customerDetails[0].address}</Text>
          <Text style={styles.text}>
            {customerDetails[0].state} {customerDetails[0].country}
          </Text>
          <Text style={styles.subtitle}>Shipping Address:</Text>
          <Text style={styles.text}>{customerDetails[0].name}</Text>
          <Text style={styles.text}>{customerDetails[0].address}</Text>
          <Text style={styles.text}>
            {customerDetails[0].state} {customerDetails[0].country}
          </Text>
        </View>

        {/* Additional Information */}
        <View style={styles.section}>
          <Text style={styles.title}>Order Information</Text>
          <Text style={styles.text}>Order Number: ABC123</Text>
          <Text style={styles.text}>
            Order Date: {new Date().toLocaleDateString()}
          </Text>
          <Text style={styles.text}>Invoice Number: INV001</Text>
          <Text style={styles.text}>
            Invoice Date: {new Date().toLocaleDateString()}
          </Text>
        </View>

        {/* Footer with Signature */}
        <View style={styles.section}>
          <Text style={styles.text}>Authorized Signatory:</Text>
          <Image src={supplierDetails[0].signature} style={styles.signature} />
        </View>
      </Page>
    </Document>
  );
};

export default InvoiceDocument;
