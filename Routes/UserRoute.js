const express = require("express");
const router = express.Router();

const UserController = new (require("../Controllers/UserController"))();

const Authentication = require("../middleware/authentication")

router.route("/profile")
    .get(
        Authentication.user,
        UserController.getProfile
    )

module.exports = router;
