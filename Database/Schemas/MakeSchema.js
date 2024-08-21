const mongoose = require("mongoose");

const MakeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	image: {
		type: String,
	},
	type: {
		type: String,
		enum: ["CAR", "BIKE"],
	},
});

module.exports = mongoose.model("makes", MakeSchema);
