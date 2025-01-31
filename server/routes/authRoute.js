const router = require("express").Router();
const { registerUserCtrl, loginUser } = require("../controllers/authController");

// /api/auth/register
router.post("/register", registerUserCtrl);

// login
router.post("/login", loginUser);


module.exports = router;