import mongoose from "mongoose";

const invoiceSchema = mongoose.Schema(
  {
    userId: {
      type: String,
    },
    items: [
      {
        description: {
          type: String,
          required: true,
        },
        unitPrice: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        discount: {
          type: Number,
        },
        netAmount: {
          type: Number,
        },
        taxRate: {
          type: Number,
        },
        taxType: {
          type: String,
        },
        totalAmount: {
          type: Number,
        },
      },
    ],

    customer: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
      },
      phone: {
        type: String,
      },
      address: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        default: "India",
      },
    },

    supplier: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
      },
      phone: {
        type: String,
      },
      address: {
        type: String,
      },
      PAN: {
        type: String,
        default: "ABCDE1234F",
      },
      GST: {
        type: String,
        default: "21ABCDE1234FA1Z5",
      },
      state: {
        type: String,
      },
      country: {
        type: String,
        default: "India",
      },
      signature: {
        type: String,
        default: "https://signature.freefire-name.com/img.php?f=10&t=Chandan",
      },
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    amountInWords: {
      type: String,
    },
    placeOfSupply: {
      type: String,
    },
    placeOfDelivery: {
      type: String,
    },
    orderNumber: {
      type: String,
    },
  },
  { timestamps: true }
);

const Invoice = mongoose.model("Invoice", invoiceSchema);
export default Invoice;
