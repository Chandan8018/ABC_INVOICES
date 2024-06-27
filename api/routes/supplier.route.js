import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createSupplier,
  deleteSupplier,
  getSuppliers,
  updateSupplier,
} from "../controllers/supplier.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createSupplier);
router.get("/getSuppliers", getSuppliers);
router.put("/update/:supplierId/:userId", verifyToken, updateSupplier);
router.delete("/delete/:supplierId/:userId", verifyToken, deleteSupplier);

export default router;
