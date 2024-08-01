const { body } = require("express-validator");

const emailBodyValidator = [
	body("email", "email is invalid")
		.trim()
		.notEmpty()
		.isEmail(),
]

const passwordBodyValidator = [
	body("password", "password required")
		.trim()
		.notEmpty()
		.isLength({ min: 8 })
		.withMessage("password must have minimum 8 characters"),
]

const otpBodyValidator = [
	body("otp", "OTP is required")
		.isInt()
		.toInt()
]

const authValidators = [
	...emailBodyValidator,
	...passwordBodyValidator,

	body("deviceToken", "deviceToken is required").trim().notEmpty(),
	body("deviceType", "deviceType is required").trim().notEmpty(),
	body("appVersion", "appVersion is required").trim().notEmpty(),
]

exports.signIn = [
	...authValidators,
];

exports.signUp = [
	...authValidators,

	body("firstName", "firstName is required").trim().notEmpty(),
	body("lastName", "lastName is required").trim().notEmpty(),
];

exports.verifyOTP = [
	...emailBodyValidator,
	...otpBodyValidator,
];

exports.forgotPassword = [
	...emailBodyValidator,
]

exports.resetPassword = [
	...emailBodyValidator,
	...passwordBodyValidator,
	...otpBodyValidator,
]