const CarModel = new (require("../Models/CarModel"))();
const CarMakeModel = new (require("../Models/MakesModel"))();
const CarModelModel = new (require("../Models/ModelsModel"))();

module.exports = class {
	addCar = async (req, res) => {
		try {
			const car = await CarModel.createCar(req.body);

			return res.handler.success(car);
		} catch (err) {
			return res.handler.serverError(err);
		}
	};

	addAllCar = async (req, res) => {
		try {
			const car = await CarModel.createCarAll(req.body.data);

			return res.handler.success(car);
		} catch (err) {
			return res.handler.serverError(err);
		}
	};

	getAllCar = async (req, res) => {
		try {
			const car = await CarModel.getAllCar({}, req.query.skip, req.query.limit);
			return res.handler.success(car);
		} catch (err) {
			return res.handler.serverError(err);
		}
	};

	addCarMake = async (req, res) => {
		try {
			const carMake = await CarMakeModel.createMakes(req.body);

			return res.handler.success(carMake);
		} catch (err) {
			return res.handler.serverError(err);
		}
	};

	addAllCarMake = async (req, res) => {
		try {
			const carAllMake = await CarMakeModel.createCarAll(req.body.data);

			return res.handler.success(carAllMake);
		} catch (err) {
			return res.handler.serverError(err);
		}
	};

	getAllCarMake = async (req, res) => {
		try {
			const getCarAllMake = await CarMakeModel.getAllMakes({}, req.query.skip, req.query.limit);
			return res.handler.success(getCarAllMake);
		} catch (err) {
			return res.handler.serverError(err);
		}
	};

	addCarModel = async (req, res) => {
		try {
			const car = await CarModelModel.createModel(req.body);

			return res.handler.success(car);
		} catch (err) {
			return res.handler.serverError(err);
		}
	};

	addAllCarModel = async (req, res) => {
		try {
			const car = await CarModelModel.createModelAll(req.body.data);

			return res.handler.success(car);
		} catch (err) {
			return res.handler.serverError(err);
		}
	};

	getAllCarModel = async (req, res) => {
		try {
			const car = await CarModelModel.getAllModel({}, req.query.skip, req.query.limit);
			return res.handler.success(car);
		} catch (err) {
			return res.handler.serverError(err);
		}
	};
};
