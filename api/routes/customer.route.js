import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createCustomer,
  deleteCustomer,
  getCustomer,
  updateCustomer,
} from "../controllers/customer.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createCustomer);
router.post("/get/:id", getCustomer);
router.post("/update", verifyToken, updateCustomer);
router.post("/delete/:id", verifyToken, deleteCustomer);

export default router;
