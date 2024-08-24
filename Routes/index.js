const { swaggerUi, specs } = require("../swagger");

module.exports = (app) => {
	app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

	/**
	 * @swagger
	 * /api/v1/:
	 *   get:
	 *     tags:
	 *       - Check Server
	 *     summary:
	 *     responses:
	 *       200:
	 *         description:
	 */
	app.get("/api/v1/", (req, res) => {
		res.status(STATUS_CODES.SUCCESS).send("Welcome to " + process.env.PROJECT_NAME);
	});

	app.use("/api/v1/auth", require("./AuthRoute"));

	app.use("/api/v1/user", require("./UserRoute"));

	app.use("/api/v1/cms/category", require("./CmsCategoryRoute"));

	app.use("/api/v1/cms/car", require("./CmsCarRoute"));

	app.use("/api/v1/cms/bike", require("./CmsBikeRoute"));

	app.use("/api/v1/cms/vehicle-regularity", require("./CmsVehicleRegularity"));

	// app.use("/api/v1/category", require("./CategoryRoute"));
};
