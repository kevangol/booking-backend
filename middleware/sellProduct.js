const CarSchema = require("../Database/Schemas/CarSchema");

const moment = require("moment");

const checkSellProduct = async (req, res, next) => {
	try {
		const startOfMonth = moment().startOf("month").toDate();
		const endOfMonth = moment().endOf("month").toDate();

		const countSoldCars = await CarSchema.countDocuments({
			userId: req.user._id,
			created_at: { $gte: startOfMonth, $lte: endOfMonth },
		}).exec();

		if (countSoldCars >= 3) {
			return res.handler.conflict(
				"You have reached your maximum selling limit for this month. To continue listing more items, please consider subscribing to our Prime membership for enhanced selling capabilities."
			);
		}

		next();
	} catch (err) {
		return res.handler.serverError(err);
	}
};

module.exports = checkSellProduct;
