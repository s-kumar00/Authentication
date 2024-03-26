const router = require('express').Router()
const authController = require("../Controllers/authController")

router.post("/register", authController.register)
router.post("/login", authController.login)
router.post("/signOut", authController.signOut)
router.post("/google", authController.google)
router.post("/emailVerification", authController.emailVerification)
router.post("/otpVerification", authController.otpVerification)
router.post("/changePassword", authController.changePassword)
module.exports = router;