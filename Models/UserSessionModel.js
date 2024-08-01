const UserSessionSchema = require("../Database/Schemas/UserSessionSchema")

const encrypt = new(require("../Configs/encrypt"))

module.exports = class {

    addSession = (body, userId) => {
        return new UserSessionSchema({
            ...body,
            userId,
            authToken: encrypt.generateAuthToken()
        }).save()
    }

    deleteSessions = async (filter) => {
        return await UserSessionSchema.deleteMany(filter)
    }

    findSession = (filter, projection, option) => {
        return UserSessionSchema.findOne(filter, projection, option)
    }

    findSessionByAuthToken = (authToken) => {
        return this.findSession(
            {
                authToken
            },
            "userId",
            {
                lean: true
            }
        )
    }

}