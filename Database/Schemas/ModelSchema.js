const mongoose = require("mongoose");

const ModelSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	make: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "makes",
	},
});

module.exports = mongoose.model("models", ModelSchema);
