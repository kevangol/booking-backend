const { IMAGE_KEYS } = require("../Configs/constants");
const S3Manager = require("../Helpers/AwsHelper");

const CategoryModel = new (require("../Models/CategoriesModel"))();

module.exports = class {
	addCategory = async (req, res) => {
		try {
			if (!(req.body.image === "" && req.body.imageName === "")) {
				await S3Manager.S3UploadBase64(req.body.image, "category", req.body.imageName);
				req.body.image = req.body.imageName;
			}
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
			const categories = await CategoryModel.getAll({}, req.query.skip, req.query.limit);

			// Use Promise.all to handle the async image fetching
			const updatedCategories = await Promise.all(
				categories.map(async (category) => {
					// Assume the category has an 'image' field that needs to be updated
					if (category.image) {
						category.image = await S3Manager.S3GetImage(`${process.env.AWS_PROJECT_NAME}/${IMAGE_KEYS.CATEGORY}/${category.image}`);
					}
					return category;
				})
			);
			return res.handler.success({
				total: totalCategory,
				page: Math.ceil(totalCategory / parseInt(req.query.limit)),
				category: updatedCategories,
			});
		} catch (err) {
			return res.handler.serverError(err);
		}
	};

	updateCategory = async (req, res) => {
		try {
			if (!(req.body.image === "" && req.body.imageName === "")) {
				await S3Manager.S3UploadBase64(req.body.image, "category", req.body.imageName);
				req.body.image = req.body.imageName;
			}
			await CategoryModel.updateCategory({ _id: req.body.categoryId }, { ...req.body });
			return res.handler.success("Category updated successfully");
		} catch (err) {
			return res.handler.serverError(err);
		}
	};
};
