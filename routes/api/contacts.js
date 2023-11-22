const express = require("express");

const controllers = require("../../controllers/contacts");

const { isValidId, validateBody } = require("../../middlewares");

const schemas = require("../../utils/contactValidationSchema/contactValidationSchema");

const router = express.Router();

router.get("/", controllers.getAll);

router.get("/:contactId", isValidId, controllers.getById);

router.post("/", validateBody(schemas.addSchema), controllers.createContact);

router.put("/:contactId", validateBody(schemas.addSchema), isValidId, controllers.updateContact);

router.patch("/:contactId/favorite", validateBody(schemas.updateFavoriteSchema), isValidId, controllers.updateFavorite);

router.delete("/:contactId", isValidId, controllers.deleteContact);

module.exports = router;
