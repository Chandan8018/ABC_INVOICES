import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createCustomer,
  deleteCustomer,
  getCustomers,
  updateCustomer,
} from "../controllers/customer.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createCustomer);
router.get("/getCustomers", getCustomers);
router.put("/update/:customerId/:userId", verifyToken, updateCustomer);
router.delete("/delete/:customerId/:userId", verifyToken, deleteCustomer);

export default router;
