import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createInvoice,
  deleteInvoice,
  getInvoices,
} from "../controllers/invoice.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createInvoice);
router.get("/getInvoices", getInvoices);
router.delete("/delete/:invoiceId/:userId", verifyToken, deleteInvoice);

export default router;
