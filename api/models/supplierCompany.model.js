import mongoose from "mongoose";

const supplierCompanySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    PAN: {
      type: String,
      required: true,
      unique: true,
    },
    GST: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const suppliercompany = mongoose.model(
  "suppliercompany",
  supplierCompanySchema
);
export default suppliercompany;
