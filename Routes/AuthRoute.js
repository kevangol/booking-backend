const express = require("express");

const AuthController = new (require("../Controllers/AuthController"))();
const AuthValidator = require("../middleware/validators/AuthValidator");

const Authentication = require("../middleware/authentication");

const router = express.Router();

/**
 * @swagger
 * /api/v1/auth/signIn:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Retrieve data from new endpoint 1
 *     responses:
 *       200:
 *         description: Successful response
 */
router.route("/signIn").post(AuthValidator.signIn, Authentication.blank, AuthController.signIn);

/**
 * @swagger
 * /api/v1/auth/signUp:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Retrieve data from new endpoint 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mobileNumber:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response
 */
router.route("/signUp").post(AuthValidator.signUp, Authentication.blank, AuthController.signUp);

/**
 * @swagger
 * /api/v1/auth/verifyOtp:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: check server running or not
 *     responses:
 *       200:
 *         description: A successful response
 */
router.route("/verifyOtp").post(AuthValidator.verifyOTP, Authentication.blank, AuthController.verifyOtp);

/**
 * @swagger
 * /api/v1/auth/forgotPassword:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: check server running or not
 *     responses:
 *       200:
 *         description: A successful response
 */
router
	.route("/forgotPassword")
	.post(AuthValidator.forgotPassword, Authentication.blank, AuthController.forgotPassword)
	.put(AuthValidator.resetPassword, Authentication.blank, AuthController.resetPassword);

module.exports = router;
