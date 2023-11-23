const express = require("express");

const controllers = require("../../controllers/auth");

const { validateBody } = require("../../middlewares");

const schemas = require("../../utils/userValidationSchema/userValidationSchema");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), controllers.register);

module.exports = router;
