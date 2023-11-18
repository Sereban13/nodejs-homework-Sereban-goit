const express = require("express");

const controllers = require("../../controllers/contacts");

const { isValidId } = require("../../middlewares");

const router = express.Router();

router.get("/", controllers.getAll);

router.get("/:contactId", isValidId, controllers.getById);

router.post("/", controllers.createContact);

router.put("/:contactId", isValidId, controllers.updateContact);

router.patch("/:contactId/favorite", isValidId, controllers.updateFavorite);

router.delete("/:contactId", isValidId, controllers.deleteContact);

module.exports = router;
