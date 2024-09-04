const { body, check } = require("express-validator");

const validateBikeAdd = [
	body("title").isString().isLength({ max: 30 }).withMessage("Variant must be a string with a maximum length of 30 characters."),
	body("makeId").isUUID().withMessage("Make ID must be a valid UUID."),
	body("modelId").isUUID().withMessage("Model ID must be a valid UUID."),
	body("vehicleTypeId").isUUID().withMessage("Vehicle Type ID must be a valid UUID."),
	body("rto").isUUID().withMessage("RTO ID must be a valid UUID."),
	body("year").isInt({ min: 1900, max: new Date().getFullYear() }).withMessage(`Year must be an integer between 1900 and ${new Date().getFullYear()}.`),
	body("variant").isString().isLength({ max: 100 }).withMessage("Variant must be a string with a maximum length of 100 characters."),
	body("engineCapacity").isInt({ min: 50, max: 2500 }).withMessage("Engine Capacity must be an integer between 50 and 2500."),
	body("fuelType").isIn(["Petrol", "Electric", "Hybrid"]).withMessage("Fuel Type must be one of Petrol, Electric, or Hybrid."),
	body("mileage").isFloat({ min: 0 }).withMessage("Mileage must be a float greater than or equal to 0."),
	body("transmission").isIn(["Manual", "Automatic"]).withMessage("Transmission must be either Manual or Automatic."),
	// body("location").optional().isString().withMessage("Location must be a string."),
	// body("latitude").optional().isString().withMessage("Latitude must be a string."),
	// body("longitude").optional().isString().withMessage("Longitude must be a string."),
	body("color").isString().isLength({ max: 50 }).withMessage("Color must be a string with a maximum length of 50 characters."),
	body("registrationNumber").isString().isLength({ max: 15 }).withMessage("Registration Number must be a string with a maximum length of 15 characters."),
	body("registrationState").isString().isLength({ max: 50 }).withMessage("Registration State must be a string with a maximum length of 50 characters."),
	body("registrationDate").isDate().withMessage("Registration Date must be a valid date."),
	body("insuranceValidTill").isDate().withMessage("Insurance Valid Till must be a valid date."),
	body("owners").isInt({ min: 1 }).withMessage("Owners must be an integer greater than or equal to 1."),
	body("price").isFloat({ min: 0 }).withMessage("Price must be a float greater than or equal to 0."),
	body("description").optional().isString().isLength({ max: 1000 }).withMessage("Description must be a string with a maximum length of 1000 characters."),
	// body("images").optional().isArray().withMessage("Images must be an array of strings."),
	// body("images.*").isString().withMessage("Each image must be a string representing a URL or path."),
];

exports.addBike = [...validateBikeAdd];
