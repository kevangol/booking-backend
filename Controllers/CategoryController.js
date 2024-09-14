const CategoryModel = new (require("../Models/CategoriesModel"))();

module.exports = class {
	addCategory = async (req, res) => {
		try {
			const category = await CategoryModel.createCategory(req.body);

			return res.handler.success(category);
		} catch (err) {
			return res.handler.serverError(err);
		}
	};

	addAllCategory = async (req, res) => {
		try {
			const category = await CategoryModel.createCategoryAll(req.body.data);

			return res.handler.success(category);
		} catch (err) {
			return res.handler.serverError(err);
		}
	};

	getAllCategory = async (req, res) => {
		try {
			const totalCategory = await CategoryModel.totalCount();
			const totalpage = totalCategory / parseInt(req.query.limit);
			const category = await CategoryModel.getAll({}, req.query.skip, req.query.limit);
			return res.handler.success({ total: totalCategory, page: totalpage, category });
		} catch (err) {
			return res.handler.serverError(err);
		}
	};
};
