const BikeModel = new (require("../Models/BikeModel"))();

module.exports = class {
	addBike = async (req, res) => {
		try {
			const bike = await BikeModel.createBike({ userId: req.user, ...req.body });
			return res.handler.success(bike);
		} catch (err) {
			console.log("error ", err);
			return res.handler.serverError(err);
		}
	};

	addAllBike = async (req, res) => {
		try {
			const bike = await BikeModel.createBikeAll(req.body.data);

			return res.handler.success(bike);
		} catch (err) {
			return res.handler.serverError(err);
		}
	};

	deleteBike = async (req, res) => {
		try {
			const bike = await BikeModel.deleteBike({ _id: req.body.bikeId });
			return res.handler.success("Bike delete successfully", bike);
		} catch (err) {
			return res.handler.serverError(err);
		}
	};

	getAllBike = async (req, res) => {
		try {
			const bike = await BikeModel.getAllBike({}, req.query.skip, req.query.limit);
			return res.handler.success(bike);
		} catch (err) {
			return res.handler.serverError(err);
		}
	};

	getMyAllBike = async (req, res) => {
		try {
			const bike = await BikeModel.getAllBike({ userId: req.user }, req.query.skip, req.query.limit);
			return res.handler.success(bike);
		} catch (err) {
			return res.handler.serverError(err);
		}
	};
};
