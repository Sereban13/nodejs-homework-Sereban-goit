const express = require("express");

const controllers = require("../../controllers/contacts");

const { isValidId, validateBody, authenticate } = require("../../middlewares");

const schemas = require("../../utils/contactValidationSchema/contactValidationSchema");

const router = express.Router();

router.get("/", authenticate, controllers.getAll);

router.get("/:contactId", authenticate, isValidId, controllers.getById);

router.post("/", authenticate, validateBody(schemas.addSchema), controllers.createContact);

router.put("/:contactId", authenticate, validateBody(schemas.addSchema), isValidId, controllers.updateContact);

router.patch(
  "/:contactId/favorite",
  authenticate,
  validateBody(schemas.updateFavoriteSchema),
  isValidId,
  controllers.updateFavorite
);

router.delete("/:contactId", authenticate, isValidId, controllers.deleteContact);

module.exports = router;
