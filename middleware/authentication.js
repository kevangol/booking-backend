const { validationResult } = require('express-validator');
const { USER_TYPE } = require("../Configs/constants");

const UserModel = new (require("../Models/UserModel"))()
module.exports = class Authentication {

	static async all(req, res, next, userTypes = [USER_TYPE.USER]) {
		try {
			//Check error if exist then send validationError
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.handler.validationError(undefined, errors.array())
			}

			//If no Authentication required means userTypes = []
			if (userTypes.length == 0) return next()

			//Get & check authToken if not exist then send unauthorized
			let authToken = req.headers.authorization.split("Bearer ")[1]
			if (!authToken) return res.handler.unauthorized()

			// Get array of data for that user type
			let arrayData = await Promise.all(userTypes.map(userType => {
				switch (userType) {
					case USER_TYPE.USER:
						return UserModel.getDetailByAuthToken(
							authToken,
							{
								isActive: 1,
								isEmailVerified: 1
							}
						)
				}
			}))

			//Check array contain data ,if exist then set isFound variable true
			let isFound = false
			arrayData.forEach((data, index) => {
				if (data) {
					isFound = true
					//Set data for key name "userType" in request
					req[userTypes[index].toLowerCase()] = data
				}
			})

			//If isFound is false then send unauthorized
			if (!isFound)
				return res.handler.unauthorized()

			if (req.user) {
				//If user is not active then send unauthorized
				if (!req.user.isActive)
					return res.handler.unauthorized()

				//If user's email not verified then send unauthorized
				if (!req.user.isEmailVerified)
					return res.handler.unauthorized()
			}

			//If All done
			next()

		} catch (err) {
			res.handler.serverError(err)
		}
	}

	//For User Authentication
	static async user(...params) {
		await Authentication.all(...params, [USER_TYPE.USER])
	}

	//For No Authentication
	static async blank(...params) {
		await Authentication.all(...params, [])
	}

}