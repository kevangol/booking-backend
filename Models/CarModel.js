const CarSchema = require("../Database/Schemas/CarSchema");

module.exports = class {
	createCar = (body) => {
		return new CarSchema(body).save();
	};

	createCarAll = (body) => {
		return CarSchema.insertMany(body);
	};

	findCar = (filter, projection, option) => {
		return CarSchema.findOne(filter, projection, option).lean();
	};

	countUserCar = (filter, projection, option) => {
		return CarSchema.findOne(filter, projection, option).countDocuments().lean();
	};

	updateCar = (filter, updatedData) => {
		return CarSchema.updateOne(filter, updatedData);
	};

	deleteCar = (filter) => {
		return CarSchema.deleteOne(filter);
	};

	getAllCar = (filter = {}, skip = 0, limit = 10) => {
		return CarSchema.find(filter)
			.skip(skip)
			.limit(limit)
			.populate([
				{
					path: "userId",
					strictPopulate: false, // Disable strict populate for this query
				},
				{
					path: "makeId",
					strictPopulate: false,
				},
				{
					path: "modelId",
					strictPopulate: false,
				},
				{
					path: "vehicleTypeId",
					strictPopulate: false,
				},
			])
			.lean();
	};
};
