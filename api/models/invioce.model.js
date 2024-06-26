import mongoose from "mongoose";

const invoiceSchema = mongoose.Schema(
  {
    dueDate: Date,
    currency: String,
    items: [
      {
        description: {
          type: String,
          required: true,
        },
        unitPrice: {
          type: String,
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
      },
    ],
    total: Number,
    subTotal: Number,
    notes: String,
    status: String,
    invoiceNumber: String,
    creator: [String],
    totalAmountReceived: Number,
    client: { name: String, email: String, phone: String, address: String },
    paymentRecords: [
      {
        amountPaid: Number,
        datePaid: Date,
        paymentMethod: String,
        note: String,
        paidBy: String,
      },
    ],
  },
  { timestamps: true }
);

const Invoice = mongoose.model("Invoice", invoiceSchema);
export default Invoice;
