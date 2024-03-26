// const {test, deleteUser} = require('../Controllers/userController.js');
const {verifyToken} = require('../utils/verifyUser.js');
const router = require('express').Router()
const userController = require("../Controllers/userController")

router.get('/', userController.test);
router.delete('/delete/:id', userController.deleteUser);
router.post('/update/:id', userController.updateUser);
router.post('/updatePassword/:id', userController.updatePassword);
module.exports = router;