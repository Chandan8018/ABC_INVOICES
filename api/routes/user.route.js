import express from "express";
import {
  deleteUser,
  signout,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

/**
 * @swagger
 * /api/user/update/{userId}:
 *   put:
 *     summary: Update user details
 *     description: Update details of a specific user
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User updated successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: User not found
 */

router.put("/update/:userId", verifyToken, updateUser);

/**
 * @swagger
 * /api/user/delete/{userId}:
 *   delete:
 *     summary: Delete a user
 *     description: Delete a specific user
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to delete
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: User not found
 */

router.delete("/delete/:userId", verifyToken, deleteUser);

/**
 * @swagger
 * /api/user/signout:
 *   post:
 *     summary: Sign out user
 *     description: Sign out the currently authenticated user
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User signed out successfully
 *       '401':
 *         description: Unauthorized
 */

router.post("/signout", signout);

export default router;
