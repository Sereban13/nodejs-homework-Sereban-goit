const express = require("express");

const controllers = require("../../controllers/auth");

const { validateBody } = require("../../middlewares");

const schemas = require("../../utils/userValidationSchema/userValidationSchema");

const router = express.Router();

// sign-up
router.post("/register", validateBody(schemas.registerSchema), controllers.register);

// sign-in
router.post("/login", validateBody(schemas.loginSchema), controllers.login);

module.exports = router;
