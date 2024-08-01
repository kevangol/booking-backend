const express = require("express");

const AuthController = new (require("../Controllers/AuthController"))();
const AuthValidator = require("../middleware/validators/AuthValidator");

const Authentication = require("../middleware/authentication");

const router = express.Router();

router.route("/signIn")
    .post(AuthValidator.signIn, Authentication.blank, AuthController.signIn);

router.route("/signUp")
    .post(AuthValidator.signUp, Authentication.blank, AuthController.signUp);

router.route("/verifyOtp")
    .post(AuthValidator.verifyOTP, Authentication.blank, AuthController.verifyOtp);
    
router.route("/forgotPassword")
    .post(AuthValidator.forgotPassword, Authentication.blank, AuthController.forgotPassword)
    .put(AuthValidator.resetPassword, Authentication.blank, AuthController.resetPassword)

module.exports = router;
