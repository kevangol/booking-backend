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

	updateCar = (filter, updatedData) => {
		return CarSchema.updateOne(filter, updatedData);
	};

	deleteCar = (filter) => {
		return CarSchema.deleteOne(filter);
	};

	getAllCar = (filter = {}, skip = 0, limit = 10) => {
		return CarSchema.find(filter).skip(skip).limit(limit).lean();
	};
};
