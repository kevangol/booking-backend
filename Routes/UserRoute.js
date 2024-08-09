const express = require("express");
const router = express.Router();

const UserController = new (require("../Controllers/UserController"))();

const Authentication = require("../middleware/authentication");

//1st pass from---------------------Middleware applying---------------------
router.use(Authentication.userAccess);

//2nd use------------
/**
 * @swagger
 * /api/v1/user/profile:
 *   get:
 *     tags:
 *       - Profile
 *     summary:
 *     responses:
 *       200:
 *         description:
 */
router.route("/profile").get(UserController.getProfile);

/**
 * @swagger
 * /api/v1/user/logout:
 *   delete:
 *     tags:
 *       - Profile
 *     summary:
 *     responses:
 *       200:
 *         description:
 */
router.route("/logout").delete(UserController.logout);

module.exports = router;
