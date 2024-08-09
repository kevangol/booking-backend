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
 *     summary:
 *     responses:
 *       200:
 *         description: Successful response
 */
router.route("/signIn").post(AuthValidator.signIn, Authentication.all, AuthController.signIn);

/**
 * @swagger
 * /api/v1/auth/signUp:
 *   post:
 *     tags:
 *       - Authentication
 *     summary:
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

/**
 * @swagger
 * /api/v1/auth/signUp:
 *   put:
 *     tags:
 *       - Authentication
 *     summary: Resend otp for user , When user have register but OTP is expired.
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
router.route("/signUp").post(AuthValidator.signUp, Authentication.all, AuthController.signUp).put(AuthValidator.resendSignUpOtp, Authentication.all, AuthController.resendSignUpOtp);

/**
 * @swagger
 * /api/v1/auth/verifyOtp:
 *   post:
 *     tags:
 *       - Authentication
 *     summary:
 *     responses:
 *       200:
 *         description:
 */
router.route("/verifyOtp").post(AuthValidator.verifyOTP, Authentication.all, AuthController.verifyOtp);

/**
 * @swagger
 * /api/v1/auth/forgotPassword:
 *   post:
 *     tags:
 *       - Authentication
 *     summary:
 *     responses:
 *       200:
 *         description:
 */
/**
 * @swagger
 * /api/v1/auth/forgotPassword:
 *   put:
 *     tags:
 *       - Authentication
 *     summary: Reset Password
 *     responses:
 *       200:
 *         description:
 */
router
	.route("/forgotPassword")
	.post(AuthValidator.forgotPassword, Authentication.all, AuthController.forgotPassword)
	.put(AuthValidator.resetPassword, Authentication.all, AuthController.resetPassword);

/**
 * @swagger
 * /api/v1/auth/verify/forgotPasswordOTP:
 *   post:
 *     tags:
 *       - Authentication
 *     summary:
 *     responses:
 *       200:
 *         description:
 */
router.route("/verify/forgotPasswordOTP").post(AuthValidator.verifyForgotPasswordOtp, Authentication.all, AuthController.verifyForgetPasswordOtp);

module.exports = router;
