const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
			trim: true,
		},
		lastName: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			trim: true,
			required: true,
			unique: true,
		},
		isActive: {
			type: Boolean,
			required: true,
			default: true,
		},
		isEmailVerified: {
			type: Boolean,
			required: true,
			default: false,
		},
		password: {
			type: String,
			required: true,
			trim: true,
		},
		profileImage: {
			type: String,
			trim: true,
		},
		otp: {
			type: Number,
			trim: true,
		},
	},
	{
		timestamps: {
			createdAt: "created_at",
			updatedAt: "updated_at",
		},
	}
)

UserSchema.pre("save", async function (next) {
	this.password = await bcrypt.hash(this.password, 12);
	next();
});

module.exports = mongoose.model("users", UserSchema);
