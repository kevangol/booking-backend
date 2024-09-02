const express = require("express");
const router = express.Router();
const CarValidator = require("../middleware/validators/CarValidator");
const CmsCarController = new (require("../Controllers/CarController"))();
const Authentication = require("../middleware/authentication");
const SellerVerification = require("../middleware/sellProduct");

//1st pass from---------------------Middleware applying---------------------
router.use(Authentication.userAccess);
// router.use(SellerVerification.checkSellProduct);

/**------1
/**
 * @swagger
 * /api/v1/car/add:
 *   post:
 *     summary: Create a new car
 *     description: Create a new car with the provided details.
 *     tags:
 *       - Cars
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the car
 *               makeId:
 *                 type: string
 *                 format: objectId
 *                 description: The make ID of the car
 *               modelId:
 *                 type: string
 *                 format: objectId
 *                 description: The model ID of the car
 *               vehicleTypeId:
 *                 type: string
 *                 format: objectId
 *                 description: The vehicle type ID of the car
 *               realModel:
 *                 type: string
 *                 description: The real model name of the car
 *               homeTestDrive:
 *                 type: boolean
 *                 description: Whether home test drive is available
 *               price:
 *                 type: number
 *                 format: float
 *                 description: The price of the car
 *               priceUnit:
 *                 type: string
 *                 enum: [RS, USD]
 *                 description: The currency unit of the price
 *               transferTax:
 *                 type: number
 *                 format: float
 *                 description: Transfer tax amount
 *               makeYear:
 *                 type: integer
 *                 format: int32
 *                 description: The year the car was made
 *               registerYear:
 *                 type: integer
 *                 format: int32
 *                 description: The year the car was registered
 *               fuel:
 *                 type: string
 *                 enum: [Petrol, Diesel, Electric, CNG, LPG]
 *                 description: The fuel type of the car
 *               kmDriven:
 *                 type: number
 *                 format: float
 *                 description: The distance driven in kilometers
 *               transmission:
 *                 type: string
 *                 enum: [Manual, Automatic, CVT, DCT]
 *                 description: The transmission type of the car
 *               numberOfOwner:
 *                 type: integer
 *                 format: int32
 *                 description: Number of previous owners
 *               insuranceValidity:
 *                 type: string
 *                 format: date
 *                 description: The validity date of the insurance
 *               insuranceType:
 *                 type: string
 *                 enum: [Third-Party, Comprehensive]
 *                 description: The type of insurance
 *               rto:
 *                 type: string
 *                 format: objectId
 *                 description: The RTO ID of the car
 *               location:
 *                 type: string
 *                 description: The location of the car
 *               mileage:
 *                 type: number
 *                 format: float
 *                 description: The mileage of the car
 *               groundClearance:
 *                 type: number
 *                 format: float
 *                 description: The ground clearance of the car
 *               seatingCapacity:
 *                 type: integer
 *                 format: int32
 *                 description: The seating capacity of the car
 *               bootSpace:
 *                 type: number
 *                 format: float
 *                 description: The boot space of the car
 *               numberOfSeatingRows:
 *                 type: integer
 *                 format: int32
 *                 description: The number of seating rows in the car
 *               fuelTankCapacity:
 *                 type: number
 *                 format: float
 *                 description: The fuel tank capacity of the car
 *               alloyWheels:
 *                 type: boolean
 *                 description: Whether the car has alloy wheels
 *               frontTyreSize:
 *                 type: string
 *                 description: The size of the front tires
 *               spareWheel:
 *                 type: boolean
 *                 description: Whether the car includes a spare wheel
 *               numberOfDoors:
 *                 type: integer
 *                 format: int32
 *                 description: The number of doors on the car
 *               drivetrain:
 *                 type: string
 *                 description: The drivetrain type of the car
 *               gearBox:
 *                 type: string
 *                 description: The type of gearbox
 *               numberOfGears:
 *                 type: integer
 *                 format: int32
 *                 description: The number of gears
 *               displacement:
 *                 type: number
 *                 format: float
 *                 description: The engine displacement
 *               numberOfCylinders:
 *                 type: integer
 *                 format: int32
 *                 description: The number of cylinders
 *               valve:
 *                 type: string
 *                 description: The type of valves used
 *               limitedSlipDifferential:
 *                 type: boolean
 *                 description: Whether the car has a limited-slip differential
 *               mildHybrid:
 *                 type: boolean
 *                 description: Whether the car is a mild hybrid
 *               turboCharger:
 *                 type: boolean
 *                 description: Whether the car has a turbocharger
 *               clutchType:
 *                 type: string
 *                 description: The type of clutch used
 *               topSpeed:
 *                 type: number
 *                 format: float
 *                 description: The top speed of the car
 *               maxPower:
 *                 type: number
 *                 format: float
 *                 description: The maximum power output of the car
 *               maxTorque:
 *                 type: number
 *                 format: float
 *                 description: The maximum torque of the car
 *               sportMode:
 *                 type: boolean
 *                 description: Whether the car has a sport mode
 *               multiDriverMode:
 *                 type: boolean
 *                 description: Whether the car has multiple driver modes
 *               suspensionFrontType:
 *                 type: string
 *                 enum: [MacPherson Strut, Double Wishbone, Multi-Link]
 *                 description: The type of front suspension
 *               suspensionRearType:
 *                 type: string
 *                 enum: [MacPherson Strut, Double Wishbone, Multi-Link]
 *                 description: The type of rear suspension
 *               steeringAdjustmentType:
 *                 type: string
 *                 enum: [Tilt, Telescopic, Tilt and Telescopic]
 *                 description: The type of steering adjustment
 *               frontBreakType:
 *                 type: string
 *                 enum: [Disc, Drum]
 *                 description: The type of front brakes
 *               rearBreakType:
 *                 type: string
 *                 enum: [Disc, Drum]
 *                 description: The type of rear brakes
 *               steeringType:
 *                 type: string
 *                 enum: [Rack and Pinion, Recirculating Ball]
 *                 description: The type of steering
 *               minimumTurningRadius:
 *                 type: number
 *                 format: float
 *                 description: The minimum turning radius of the car
 *     responses:
 *       '201':
 *         description: Car created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       '400':
 *         description: Invalid request data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                       param:
 *                         type: string
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */

/**-------2
 * @swagger
 * /api/v1/car:
 *   get:
 *     tags:
 *       - Cars
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

/**-------3
 * @swagger
 * /api/v1/car/my-cars:
 *   get:
 *     tags:
 *       - Cars
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

/**------4
/**
 * @swagger
 * /api/v1/car/delete:
 *   delete:
 *     summary: Delete a car
 *     description:
 *     tags:
 *       - Cars
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               carId:
 *                 type: string
 *                 description: give here car id
 *     responses:
 *       '200':
 *         description: 
 */

router.route("/add").post(CarValidator.addCar, CmsCarController.addCar);

router.route("/").get(CmsCarController.getAllCar);

router.route("/my-cars").get(CmsCarController.getMyAllCar);

router.route("/delete").delete(CmsCarController.deleteCar);

module.exports = router;
