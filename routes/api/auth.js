const express = require("express");

const controllers = require("../../controllers/auth");

const { validateBody, authenticate } = require("../../middlewares");

const schemas = require("../../utils/userValidationSchema/userValidationSchema");

const router = express.Router();

// sign-up
router.post("/register", validateBody(schemas.registerSchema), controllers.register);

// sign-in
router.post("/login", validateBody(schemas.loginSchema), controllers.login);

// current
router.get("/current", authenticate, controllers.getCurrent);

// logout
router.post("/logout", authenticate, controllers.logout);

module.exports = router;
