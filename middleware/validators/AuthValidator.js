const { body } = require("express-validator");

const mobileNumberBodyValidator = [body("mobileNumber", "mobileNumber is invalid").trim().notEmpty().isMobilePhone()];

const passwordBodyValidator = [body("password", "password required").trim().notEmpty().isLength({ min: 8 }).withMessage("password must have minimum 8 characters")];

const otpBodyValidator = [body("otp", "OTP is required").isInt().toInt()];

const authValidators = [
	...mobileNumberBodyValidator,
	...passwordBodyValidator,
	body("deviceType", "deviceType is required").trim().notEmpty(),
	body("appVersion", "appVersion is required").trim().notEmpty(),
];

exports.signIn = [...authValidators];

exports.signUp = [...authValidators];

exports.verifyOTP = [...mobileNumberBodyValidator, ...otpBodyValidator, body("deviceType", "deviceType is required").trim().notEmpty(), body("appVersion", "appVersion is required").trim().notEmpty()];

exports.forgotPassword = [...mobileNumberBodyValidator];

exports.resetPassword = [...mobileNumberBodyValidator, ...passwordBodyValidator, ...otpBodyValidator];
