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
  { timestamps: true }
);

const supplier = mongoose.model("supplier", supplierCompanySchema);
export default supplier;
