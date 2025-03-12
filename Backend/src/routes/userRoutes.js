const express = require("express");
const userController = require("../controllers/userContoller");

const router = express.Router();

router.post("/registration", userController.userRegistration);
router.get("/verify", userController.userVerification);
router.post("/login", userController.userLogin);

module.exports = router;
