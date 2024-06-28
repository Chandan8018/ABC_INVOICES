import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createCustomer,
  deleteCustomer,
  getCustomers,
  updateCustomer,
} from "../controllers/customer.controller.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Customer:
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
 *          description: Customer Name
 *        email:
 *          type: string
 *          description: Customer Email
 *        phone:
 *          type: string
 *          description: Customer Phone Number
 *        address:
 *          type: string
 *          description: Customer Address
 *        state:
 *          type: string
 *          description: Customer State
 *        country:
 *          type: string
 *          description: Customer Country
 *      example:
 *        id: GDHJGD788BJBJ
 *        userId: GDHJGD788BJBJ
 *        name: ChandanKumar
 *        email: chandan@gmail.com
 *        phone: 1234567890
 *        address: 123, Main Street 750001
 *        state: ODISHA
 *        country: INDIA
 */

/**
 * @swagger
 * /api/customer/create:
 *   post:
 *     summary: Create a new customer
 *     description: Create a new customer with the provided details
 *     tags:
 *       - Customers
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       '200':
 *         description: Customer created successfully
 *       '401':
 *         description: Unauthorized
 *       '400':
 *         description: Bad request
 */

router.post("/create", verifyToken, createCustomer);

/**
 * @swagger
 * /api/customer/getCustomers:
 *   get:
 *     summary: Get all Customers
 *     description: Retrieve a list of all customers
 *     tags:
 *       - Customers
 *     responses:
 *       '200':
 *         description: List of customers retrieved successfully
 *       '400':
 *         description: Bad request
 */

router.get("/getCustomers", getCustomers);

/**
 * @swagger
 * /api/customer/update/{customerId}/{userId}:
 *   put:
 *     summary: Update a Customer Details
 *     description: Update Customer Details with the specified customer ID and user ID
 *     tags:
 *       - Customers
 *     parameters:
 *       - in: path
 *         name: customerId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the customer to update
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user who created the customer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Customer updated successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Post not found
 */

router.put("/update/:customerId/:userId", verifyToken, updateCustomer);

/**
 * @swagger
 * /api/customer/delete/{customerId}/{userId}:
 *   delete:
 *     summary: Delete a customer
 *     description: Delete a customer with the specified customer ID and user ID
 *     tags:
 *       - Customers
 *     parameters:
 *       - in: path
 *         name: customerId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the customer to delete
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user who created the customer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Customer deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Post not found
 */

router.delete("/delete/:customerId/:userId", verifyToken, deleteCustomer);

export default router;
