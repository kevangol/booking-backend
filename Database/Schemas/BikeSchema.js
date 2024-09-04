const mongoose = require("mongoose");

const BikeSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "users",
		required: true,
	},
	title: {
		type: String,
		required: true,
		minlength: 3,
	},
	makeId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "makes",
		required: true,
	},
	modelId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "models",
		required: true,
	},
	vehicleTypeId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "vehicleType",
		required: true,
	},
	rto: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "rto",
		required: true,
	},
	year: {
		type: Number,
		required: true,
		min: [1900, "Year must be after 1900"],
		max: [new Date().getFullYear(), `Year cannot be in the future`],
	},
	variant: {
		type: String,
		trim: true,
		maxlength: [100, "Variant name cannot exceed 100 characters"],
	},
	engineCapacity: {
		type: Number,
		required: true,
		min: [50, "Engine capacity must be at least 50cc"],
		max: [2500, "Engine capacity must be below 2500cc"],
	},
	fuelType: {
		type: String,
		enum: ["Petrol", "Electric", "Hybrid"],
		required: true,
	},
	mileage: {
		type: Number,
		required: true,
		min: [0, "Mileage cannot be negative"],
	},
	transmission: {
		type: String,
		enum: ["Manual", "Automatic"],
		required: true,
	},
	location: {
		type: String,
		default: "123, Park Street, Park Circus, Kolkata, West Bengal 700017, India",
	},
	latitude: {
		type: String,
		default: "22.5585",
	},
	longitude: {
		type: String,
		default: "88.3493",
	},
	color: {
		type: String,
		trim: true,
		maxlength: [50, "Color name cannot exceed 50 characters"],
	},
	registrationNumber: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		maxlength: [15, "Registration number cannot exceed 15 characters"],
		validate: {
			validator: function (v) {
				return /^[A-Z0-9-]+$/.test(v);
			},
			message: (props) => `${props.value} is not a valid registration number`,
		},
	},
	registrationState: {
		type: String,
		required: true,
		trim: true,
		maxlength: [50, "Registration state cannot exceed 50 characters"],
	},
	registrationDate: {
		type: Date,
		required: true,
		validate: {
			validator: function (v) {
				return v <= Date.now();
			},
			message: "Registration date cannot be in the future",
		},
	},
	insuranceValidTill: {
		type: Date,
		required: true,
		validate: {
			validator: function (v) {
				return v > Date.now();
			},
			message: "Insurance validity date must be in the future",
		},
	},
	owners: {
		type: Number,
		required: true,
		min: [1, "There must be at least one owner"],
	},
	price: {
		type: Number,
		required: true,
		min: [0, "Price cannot be negative"],
	},
	description: {
		type: String,
		trim: true,
		maxlength: [1000, "Description cannot exceed 1000 characters"],
	},
	images: { type: [String], default: ["https://images.hdqwalls.com/download/humanoid-robot-4k-yu-3840x2160.jpg", "https://images.hdqwalls.com/download/humanoid-robot-4k-yu-3840x2160.jpg"] },
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("bikes", BikeSchema);
