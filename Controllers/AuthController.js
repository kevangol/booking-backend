const UserModel = new (require("../Models/UserModel"))();
const UserSessionModel = new (require("../Models/UserSessionModel"))();

const encrypt = new (require("../Configs/encrypt"))()
const randomStringHelper = require("../Helpers/GeneralHelpers");

const {
	inviteUserMail,
	forgotPasswordMail
} = require("../Helpers/EmailHelper");

module.exports = class {
	signIn = async (req, res) => {
		try {
			const user = await UserModel.findUserByEmail(req.body.email)
			if (!user)
				return res.handler.notFound("VALIDATION.NOT_FOUND.USER")

			if (!encrypt.compareBcrypt(req.body.password, user.password))
				return res.handler.conflict("VALIDATION.PASSWORD.INCORRECT")

			if (!user.isActive)
				return res.handler.notAllowed("VALIDATION.STATUS.DEACTIVATED_ACCOUNT")

			const newSession = await UserSessionModel.addSession(req.body, user._id);
			return res.handler.success({
				id: user._id,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				isEmailVerified: user.isEmailVerified,
				authToken: newSession.authToken,
			});
		} catch (error) {
			return res.handler.serverError(error);
		}
	}

	signUp = async (req, res) => {
		try {
			const userExist = await UserModel.findUserByEmail(req.body.email, "_id")
			if (userExist) {
				return res.handler.conflict("VALIDATION.EXISTS.EMAIL");
			}

			//FIX:ME Do code for upload image

			const otp = randomStringHelper.generateOtp();
			req.body.otp = otp;

			const newUser = await UserModel.createUser(req.body);
			const newSession = await UserSessionModel.addSession(req.body, newUser._id);

			inviteUserMail(newUser.email, otp);

			return res.handler.success({
				id: newUser._id,
				firstName: newUser.firstName,
				lastName: newUser.lastName,
				email: newUser.email,
				isEmailVerified: newUser.isEmailVerified,
				authToken: newSession.authToken,
			});
		} catch (error) {
			return res.handler.serverError(error);
		}
	};

	verifyOtp = async (req, res) => {
		try {
			const userDetails = await UserModel.findUserByEmail(req.body.email, "otp");
			if (!userDetails) {
				return res.handler.notFound("VALIDATION.NOT_FOUND.USER");
			}

			if (userDetails.otp !== req.body.otp) {
				return res.handler.validationError("VALIDATION.OTP.MISMATCH");
			}

			await UserModel.updateUser(
				{
					email: req.body.email
				},
				{
					otp: null,
					isEmailVerified: true
				}
			);

			return res.handler.success(null, "VALIDATION.OTP.VERIFIED");
		} catch (error) {
			return res.handler.serverError(error);
		}
	}

	forgotPassword = async (req, res) => {
		try {
			const user = await UserModel.findUserByEmail(req.body.email, "email");
			if (!user)
				return res.handler.notFound("VALIDATION.NOT_FOUND.USER")

			const otp = randomStringHelper.generateOtp();

			await UserModel.updateUser(
				{
					email: req.body.email
				},
				{
					otp,
				}
			);

			forgotPasswordMail(user.email, otp)

			return res.handler.success(undefined, "PROCESS.SENT.EMAIL")
		} catch (err) {
			return res.handler.serverError(err)
		}
	}

	resetPassword = async (req, res) => {
		try {
			const user = await UserModel.findUserByEmail(req.body.email, "otp", {});
			if (!user)
				return res.handler.notFound("VALIDATION.NOT_FOUND.USER")

			if (user.otp !== req.body.otp)
				return res.handler.validationError("VALIDATION.OTP.MISMATCH");

			user.password = req.body.password
			user.otp = null

			await Promise.all([
				user.save(),
				UserSessionModel.deleteSessions({
					userId: user._id
				})
			])

			return res.handler.updated(undefined, "USER.RESET_PASSWORD")
		} catch (err) {
			return res.handler.serverError(err)
		}
	}

};
