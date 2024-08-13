const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema(
	{
		makeYear: {},
		registerYear: {},
		fuel: {},
		kmDriven: {},
		transmission: {},
		numberOfOwner: {},
		insuranceValidity: {},
		insuranceType: {},
		rto: {},
		location: {},
		mileage: {},
		groundClearance: {},
		bootSpace: {},
		seatingCapacity: {},
		fuelTankCapacity: {},
		displacement: {},
	},
	{
		timestamps: {
			createdAt: "created_at",
			updatedAt: "updated_at",
		},
	}
);

module.exports = mongoose.model("categories", CategorySchema);
