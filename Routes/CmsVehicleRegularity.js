const express = require("express");
const router = express.Router();
const CarValidator = require("../middleware/validators/CarValidator");
const CmsCarController = new (require("../Controllers/CarController"))();
const RtoController = new (require("../Controllers/RtoController"))();

// ----------------------------------------------------------------------------------------------
/**
 * @swagger
 * /api/v1/cms/vehicle-regularity/make/add:
 *   post:
 *     tags:
 *       - Vehicle Regularity
 *     summary:
 *     responses:
 *       200:
 *         description:
 */
router.route("/make/add").post(CarValidator.addCar, CmsCarController.addCarMake);

/**
 * @swagger
 * /api/v1/cms/vehicle-regularity/make/add/All:
 *   post:
 *     tags:
 *       - Vehicle Regularity
 *     summary:
 *     responses:
 *       200:
 *         description:
 */
router.route("/make/add/All").post(CmsCarController.addAllCarMake);

/**
 * @swagger
 * /api/v1/cms/vehicle-regularity/make:
 *   get:
 *     tags:
 *       - Vehicle Regularity
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
router.route("/make").get(CmsCarController.getAllCarMake);

//---------------------------------------------------------------------------------------------------------------------
/**
 * @swagger
 * /api/v1/cms/vehicle-regularity/model/add:
 *   post:
 *     tags:
 *       - Vehicle Regularity
 *     summary:
 *     responses:
 *       200:
 *         description:
 */
router.route("/model/add").post(CarValidator.addCar, CmsCarController.addCarModel);

/**
 * @swagger
 * /api/v1/cms/vehicle-regularity/model/add/All:
 *   post:
 *     tags:
 *       - Vehicle Regularity
 *     summary:
 *     responses:
 *       200:
 *         description:
 */
router.route("/model/add/All").post(CmsCarController.addAllCarModel);

/**
 * @swagger
 * /api/v1/cms/vehicle-regularity/model/:
 *   get:
 *     tags:
 *       - Vehicle Regularity
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
router.route("/model").get(CmsCarController.getAllCarModel);

//-----------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------

/**
 * @swagger
 * /api/v1/cms/vehicle-regularity/rto/add:
 *   post:
 *     tags:
 *       - Vehicle Regularity
 *     summary:
 *     responses:
 *       200:
 *         description:
 */
router.route("/rto/add").post(CarValidator.addCar, RtoController.addRto);

/**
 * @swagger
 * /api/v1/cms/vehicle-regularity/rto/add/All:
 *   post:
 *     tags:
 *       - Vehicle Regularity
 *     summary: Add multiple RTO details
 *     description: Adds multiple RTO (Regional Transport Office) details in a single request. Each RTO detail must include `name`, `code`, `city`, and `state`.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: array
 *                 description: Array of RTO details to be added
 *                 items:
 *                   type: object
 *                   required:
 *                     - name
 *                     - code
 *                     - city
 *                     - state
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: Name of the RTO
 *                     code:
 *                       type: string
 *                       description: Code of the RTO
 *                     city:
 *                       type: string
 *                       description: City where the RTO is located
 *                     state:
 *                       type: string
 *                       description: State where the RTO is located
 *     responses:
 *       200:
 *         description: Successfully added RTO details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: RTO details added successfully
 *       400:
 *         description: Bad request due to invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid input data
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
router.route("/rto/add/All").post(RtoController.addAllRto);

/**
 * @swagger
 * /api/v1/cms/vehicle-regularity/rto:
 *   get:
 *     tags:
 *       - Vehicle Regularity
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
router.route("/rto").get(RtoController.getAllRto);
// -------------------------------------------------------------------------

/**
 * @swagger
 * /api/v1/cms/vehicle-regularity/rto/delete:
 *   delete:
 *     tags:
 *       - Vehicle Regularity
 *     summary: delete rto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: delete rto by id
 *     responses:
 *       200:
 *         description: Successfully added RTO details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: RTO details added successfully
 *       400:
 *         description: Bad request due to invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid input data
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
router.route("/rto/delete").delete(RtoController.deleteRto);

module.exports = router;
