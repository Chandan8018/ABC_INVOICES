import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createSupplier,
  deleteSupplier,
  getSuppliers,
  updateSupplier,
} from "../controllers/supplier.controller.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    supplier:
 *      type: object
 *      required:
 *        - name
 *        - email
 *        - address
 *        - state
 *      properties:
 *        id:
 *          type: string
 *          description: The Auto-generated id of customers collection by MongoDB
 *        userId:
 *          type: string
 *          description: Authenticated user id
 *        name:
 *          type: string
 *          description: Supplier Name
 *        email:
 *          type: string
 *          description: Supplier Email
 *        phone:
 *          type: string
 *          description: Supplier Phone Number
 *        address:
 *          type: string
 *          description: Supplier Address
 *        state:
 *          type: string
 *          description: Supplier State
 *        country:
 *          type: string
 *          description: Supplier Country
 *        PAN:
 *          type: string
 *          description: Supplier PAN Number
 *        GST:
 *          type: string
 *          description: Supplier GST Number
 *        signature:
 *          type: string
 *          description: Supplier Signature
 *      example:
 *        id: GDHJGD788BJBJ
 *        userId: GDHJGD788BJBJ
 *        name: ChandanKumar
 *        email: chandan@gmail.com
 *        phone: 1234567890
 *        address: 123, Main Street 750001
 *        state: ODISHA
 *        country: INDIA
 *        PAN: ABCDE1234F
 *        GST: 21ABCDE1234FA1Z5
 *        signature: https://signature.freefire-name.com/img.php?f=10&t=Chandan
 */

/**
 * @swagger
 * /api/supplier/create:
 *   post:
 *     summary: Create a new supplier
 *     description: Create a new supplier with the provided details
 *     tags:
 *       - Suppliers
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/supplier'
 *     responses:
 *       '200':
 *         description: Supplier created successfully
 *       '401':
 *         description: Unauthorized
 *       '400':
 *         description: Bad request
 */

router.post("/create", verifyToken, createSupplier);

/**
 * @swagger
 * /api/supplier/getSuppliers:
 *   get:
 *     summary: Get all Suppliers
 *     description: Retrieve a list of all Suppliers
 *     tags:
 *       - Suppliers
 *     responses:
 *       '200':
 *         description: List of suppliers retrieved successfully
 *       '400':
 *         description: Bad request
 */

router.get("/getSuppliers", getSuppliers);

/**
 * @swagger
 * /api/supplier/update/{supplierId}/{userId}:
 *   put:
 *     summary: Update a Supplier Details
 *     description: Update Supplier Details with the specified supplier ID and user ID
 *     tags:
 *       - Suppliers
 *     parameters:
 *       - in: path
 *         name: supplierId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the supplier to update
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user who created the supplier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/supplier'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Supplier updated successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Post not found
 */

router.put("/update/:supplierId/:userId", verifyToken, updateSupplier);

/**
 * @swagger
 * /api/supplier/delete/{supplierId}/{userId}:
 *   delete:
 *     summary: Delete a supplier
 *     description: Delete a supplier with the specified supplier ID and user ID
 *     tags:
 *       - Suppliers
 *     parameters:
 *       - in: path
 *         name: supplierId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the supplier to delete
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user who created the supplier
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Supplier deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Post not found
 */

router.delete("/delete/:supplierId/:userId", verifyToken, deleteSupplier);

export default router;
