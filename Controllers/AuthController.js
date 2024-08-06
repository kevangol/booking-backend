const UserModel = new (require("../Models/UserModel"))();
const UserSessionModel = new (require("../Models/UserSessionModel"))();

const encrypt = new (require("../Configs/encrypt"))();
const randomStringHelper = require("../Helpers/GeneralHelpers");

const { sendOtpVerificationMessage, forgetPasswordOtpMessage } = require("../Helpers/SmsHelper");

module.exports = class {
	signIn = async (req, res) => {
		try {
			const user = await UserModel.findUserByPhoneNumber(req.body.mobileNumber);
			if (!user) return res.handler.notFound("VALIDATION.NOT_FOUND.USER");

			if (!encrypt.compareBcrypt(req.body.password, user.password)) return res.handler.conflict("VALIDATION.PASSWORD.INCORRECT");

			if (!user.isActive) return res.handler.notAllowed("VALIDATION.STATUS.DEACTIVATED_ACCOUNT");

			const newSession = await UserSessionModel.addSession(req.body, user._id);

			return res.handler.success({
				id: user._id,
				mobileNumber: user.mobileNumber,
				authToken: newSession.authToken,
			});
		} catch (error) {
			return res.handler.serverError(error);
		}
	};

	signUp = async (req, res) => {
		try {
			const userExist = await UserModel.findUserByPhoneNumber(req.body.mobileNumber, "_id");
			if (userExist) {
				return res.handler.conflict("VALIDATION.EXISTS.MOBILE_NUMBER");
			}

			const otp = randomStringHelper.generateOtp();
			req.body.otp = otp;

			const newUser = await UserModel.createUser(req.body);
			await sendOtpVerificationMessage(otp, "+" + newUser?.countryCode + "" + newUser?.mobileNumber);

			return res.handler.success({
				id: newUser._id,
				mobileNumber: newUser.mobileNumber,
			});
		} catch (error) {
			return res.handler.serverError(error);
		}
	};

	verifyOtp = async (req, res) => {
		try {
			const userDetails = await UserModel.findUserByPhoneNumber(req.body.mobileNumber, "otp");
			if (!userDetails) {
				return res.handler.notFound("VALIDATION.NOT_FOUND.USER");
			}

			if (userDetails.otp !== req.body.otp) {
				return res.handler.validationError("VALIDATION.OTP.MISMATCH");
			}

			await UserModel.updateUser(
				{
					mobileNumber: req.body.mobileNumber,
				},
				{
					otp: null,
					isVerified: true,
				}
			);

			const newSession = await UserSessionModel.addSession({ ...userDetails }, userDetails._id);

			return res.handler.success({ token: newSession?.authToken }, "VALIDATION.OTP.VERIFIED");
		} catch (error) {
			return res.handler.serverError(error);
		}
	};

	forgotPassword = async (req, res) => {
		try {
			const user = await UserModel.findUserByPhoneNumber(req.body.mobileNumber, "mobileNumber");
			if (!user) return res.handler.notFound("VALIDATION.NOT_FOUND.USER");

			const otp = randomStringHelper.generateOtp();

			await UserModel.updateUser(
				{
					mobileNumber: req.body.mobileNumber,
				},
				{
					otp,
				}
			);
			await forgetPasswordOtpMessage(otp, "+" + user.countryCode + "" + user.mobileNumber);

			return res.handler.success(undefined, "PROCESS.SENT.MSG_SENT");
		} catch (err) {
			return res.handler.serverError(err);
		}
	};

	resetPassword = async (req, res) => {
		try {
			const user = await UserModel.findUserByPhoneNumber(req.body.mobileNumber, "otp", {});
			if (!user) return res.handler.notFound("VALIDATION.NOT_FOUND.USER");

			if (user.otp !== req.body.otp) return res.handler.validationError("VALIDATION.OTP.MISMATCH");

			user.password = req.body.password;
			user.otp = null;

			await Promise.all([
				user.save(),
				UserSessionModel.deleteSessions({
					userId: user._id,
				}),
			]);

			return res.handler.updated(undefined, "USER.RESET_PASSWORD");
		} catch (err) {
			return res.handler.serverError(err);
		}
	};
};
