const mongoose = require("mongoose");

// Enums
const fuelTypes = ["Petrol", "Diesel", "Electric", "CNG", "LPG"];
const transmissionTypes = ["Manual", "Automatic", "CVT", "DCT"];
const insuranceTypes = ["Third-Party", "Comprehensive"];
const steeringAdjustmentTypes = ["Tilt", "Telescopic", "Tilt and Telescopic"];
const suspensionTypes = ["MacPherson Strut", "Double Wishbone", "Multi-Link"];
const brakeTypes = ["Disc", "Drum"];
const steeringTypes = ["Rack and Pinion", "Recirculating Ball"];

const CarSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "users",
		},
		title: {
			type: String,
			required: true,
			minlength: 3,
		},
		makeId: { type: mongoose.Schema.Types.ObjectId, ref: "makes" },
		modelId: { type: mongoose.Schema.Types.ObjectId, ref: "models" },
		vehicleTypeId: { type: mongoose.Schema.Types.ObjectId, ref: "vehicleType" },
		images: { type: [String], default: ["https://images.hdqwalls.com/download/humanoid-robot-4k-yu-3840x2160.jpg", "https://images.hdqwalls.com/download/humanoid-robot-4k-yu-3840x2160.jpg"] },
		realModel: { type: String },
		homeTestDrive: { type: Boolean },
		price: {
			type: Number,
			required: true,
			min: 0,
		},
		priceUnit: { type: String, default: "RS" },
		transferTax: {
			type: Number,
			min: 0,
		},
		makeYear: {
			type: Number,
			required: true,
			min: 1900,
			max: new Date().getFullYear(),
		},
		registerYear: {
			type: Number,
			required: true,
			min: 1900,
			max: new Date().getFullYear(),
		},
		fuel: {
			type: String,
			enum: fuelTypes,
			required: true,
		},
		kmDriven: {
			type: Number,
			default: 0,
			min: 0,
		},
		transmission: {
			type: String,
			enum: transmissionTypes,
			required: true,
		},
		numberOfOwner: {
			type: Number,
			default: 1,
			min: 1,
		},
		insuranceValidity: { type: Date },
		insuranceType: {
			type: String,
			enum: insuranceTypes,
			required: true,
		},
		rto: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "rto",
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
		mileage: {
			type: Number,
			min: 0,
		},
		groundClearance: {
			type: Number,
			min: 0,
		},
		seatingCapacity: {
			type: Number,
			min: 1,
		},
		bootSpace: {
			type: Number,
			min: 0,
		},
		numberOfSeatingRows: {
			type: Number,
			default: 5,
			min: 1,
			max: 5,
		},
		fuelTankCapacity: {
			type: Number,
			min: 0,
		},
		alloyWheels: {
			type: Boolean,
			default: false,
		},
		frontTyreSize: String,
		spareWheel: {
			type: Boolean,
			default: true,
		},
		numberOfDoors: {
			type: Number,
			default: 4,
			min: 2,
			max: 6,
		},
		drivetrain: String,
		gearBox: String,
		numberOfGears: {
			type: Number,
			min: 1,
		},
		displacement: {
			type: Number,
			min: 0,
		},
		numberOfCylinders: {
			type: Number,
			min: 1,
		},
		valve: String,
		limitedSlipDifferential: {
			type: Boolean,
			default: false,
		},
		mildHybrid: {
			type: Boolean,
			default: false,
		},
		turboCharger: {
			type: Boolean,
			default: false,
		},
		clutchType: String,
		topSpeed: {
			type: Number,
			min: 0,
		},
		maxPower: {
			type: Number,
			min: 0,
		},
		maxTorque: {
			type: Number,
			min: 0,
		},
		sportMode: {
			type: Boolean,
			default: false,
		},
		multiDriverMode: {
			type: Boolean,
			default: false,
		},
		suspensionFrontType: {
			type: String,
			enum: suspensionTypes,
		},
		suspensionRearType: {
			type: String,
			enum: suspensionTypes,
		},
		steeringAdjustmentType: {
			type: String,
			enum: steeringAdjustmentTypes,
		},
		frontBreakType: {
			type: String,
			enum: brakeTypes,
		},
		rearBreakType: {
			type: String,
			enum: brakeTypes,
		},
		steeringType: {
			type: String,
			enum: steeringTypes,
		},
		minimumTurningRadius: {
			type: Number,
			min: 0,
		},
	},
	{
		timestamps: {
			createdAt: "created_at",
			updatedAt: "updated_at",
		},
	}
);

module.exports = mongoose.model("cars", CarSchema);
