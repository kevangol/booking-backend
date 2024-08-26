const UserController = new (require("../Controllers/UserController"))();
const CarController = new (require("../Controllers/CarController"))();

module.exports = class SellProduct {
	static checkSellProduct = async (req, res, next) => {
		try {
			const checkSellProcess = await UserController.getIamSeller(req, res);

			if (!checkSellProcess) {
				const countOfSellProduct = await CarController.getCountOfSellProduct(req, res);

				return res.handler.forbidden("Your sell products limit is over now, Please go with become seller.", countOfSellProduct);
			}
		} catch (err) {
			return res.handler.serverError(err);
		}
	};
};
