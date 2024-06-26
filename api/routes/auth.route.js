import express from "express";
import { googleAuth, signin, signup } from "../controllers/auth.controller.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - username
 *        - email
 *        - password
 *      properties:
 *        id:
 *          type: string
 *          description: The Auto-generated id of user collection
 *        username:
 *          type: string
 *          description: User name
 *        email:
 *          type: string
 *          description: user email address
 *        password:
 *          type: string
 *          description: user password
 *        profilePicture:
 *          type: string
 *          description: user profile picture
 *        isAdmin:
 *          type: boolean
 *          description: user admin or not
 *        regdNumber:
 *          type: string
 *          description: user registration number
 *      example:
 *        id: GDHJGD788BJBJ
 *        username: Chandan123
 *        email: chandan@gmail.com
 *        password: chandan@123
 *        profilePicture: https://pics.craiyon.com
 *        isAdmin: false
 *        regdNumber: 1a2b3c4d
 */

/**
 *  @swagger
 *  tags:
 *    name: Auth
 *    description: authentication apis
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with username, email, and password
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: User registered successfully
 *       '400':
 *         description: Invalid request body
 *       '409':
 *         description: User already exists
 */

router.post("/signup", signup);

/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     summary: Authenticate user
 *     description: Authenticate user with email and password
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: User authenticated successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 */

router.post("/signin", signin);

/**
 * @swagger
 * /api/auth/google:
 *   post:
 *     summary: Authenticate with Google
 *     description: Authenticate user with Google OAuth
 *     tags:
 *       - Authentication
 *     responses:
 *       '200':
 *         description: User authenticated successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 */

router.post("/google", googleAuth);

export default router;
