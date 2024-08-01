const mongoose = require("mongoose");

const {
    DEVICE_TYPE
} = require("../../Configs/constants")

const UserSessionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        deviceToken: {
            type: String,
            trim: true,
            required: true,
        },
        deviceType: {
            type: String,
            trim: true,
            required: true,
            enum: Object.values(DEVICE_TYPE)
        },
        appVersion: {
            type: String,
            trim: true,
            required: true,
        },
        authToken: {
            type: String,
            trim: true,
            required: true,
        },
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
)

module.exports = mongoose.model("user_sessions", UserSessionSchema);
