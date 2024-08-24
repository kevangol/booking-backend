const { body } = require("express-validator");

const carValidators = [body("title", "deviceType is required").trim().notEmpty()];

exports.addCar = [...carValidators];
