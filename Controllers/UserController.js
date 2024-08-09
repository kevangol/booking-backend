const UserModel = new (require("../Models/UserModel"))();
const UserSessionModel = new (require("../Models/UserSessionModel"))();

module.exports = class {
	getProfile = async (req, res) => {
		try {
			const user = await UserModel.findUser(
				{
					_id: req.user,
				},
				{
					password: 0,
					isEmailVerified: 0,
				},
				{
					lean: true,
				}
			);
			return res.handler.success(user);
		} catch (error) {
			return res.handler.serverError(error);
		}
	};

	logout = async (req, res) => {
		try {
			const token = req.header("Authorization")?.replace("Bearer ", "");
			await UserSessionModel.deleteSession({ userId: req.user, authToken: token });
			return res.handler.success("Session Expired");
		} catch (err) {
			return res.handler.serverError(error);
		}
	};
};
