const UserModel = new (require("../Models/UserModel"))

module.exports = class {

    getProfile = async (req, res) => {
        try {
            const user = await UserModel.findUser(
                {
                    _id: req.user._id
                },
                {
                    password: 0,
                    isEmailVerified: 0,
                },
                {
                    lean: true
                }
            )
            return res.handler.success(user)
        }
        catch (error) {
            return res.handler.serverError(error)
        }
    }

}