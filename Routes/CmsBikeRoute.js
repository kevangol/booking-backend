const express = require("express");
const router = express.Router();
const CarValidator = require("../middleware/validators/CarValidator");
const CmsCarController = new (require("../Controllers/CarController"))();

/**
 * @swagger
 * /api/v1/cms/bike/add:
 *   post:
 *     tags:
 *       - Bikes
 *     summary:
 *     responses:
 *       200:
 *         description:
 */
router.route("/add").post(CarValidator.addCar, CmsCarController.addCar);

/**
 * @swagger
 * /api/v1/cms/bike/add/All:
 *   post:
 *     tags:
 *       - Bikes
 *     summary:
 *     responses:
 *       200:
 *         description:
 */
router.route("/add/All").post(CmsCarController.addAllCar);

/**
 * @swagger
 * /api/v1/cms/bike/:
 *   get:
 *     tags:
 *       - Bikes
 *     summary:
 *     parameters:
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *           example: 0
 *         description: The number of items to skip for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: The maximum number of items to return
 *     responses:
 *       200:
 *         description:
 */
router.route("/").get(CmsCarController.getAllCar);

module.exports = router;
