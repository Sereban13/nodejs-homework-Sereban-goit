const express = require("express");
// const Joi = require("joi");
//
const contacts = require("../../models/contacts");
const { HttpError } = require("../../helpers");
const contactSchema = require("../../utils/validation/contactValidationSchema");

const router = express.Router();

// const contactSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string()
//     .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
//     .required(),
//   phone: Joi.string()
//     .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
//     .required(),
// });

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw HttpError(404, "Contact not found");

      // const error = new Error("Contact not found");
      // error.status = 404;
      // throw error;

      // return res.status(404).json({ message: "Contact not found" });
    }
    res.json(result);
  } catch (error) {
    next(error);
    // шукає обробник помилок, де є 4 параметри (у нас це знаходиться в арр = app.use);
  }
});

// router.post("/", async (req, res, next) => {
//   try {
//     const { error } = contactSchema.validate(req.body);
//     if (error) {
//       const missingKeys = error.details.map((detail) => detail.context.key);
//       return res.status(404).json({ message: `missing required ${missingKeys} field` });

//     }
//     const result = await contacts.addContact(req.body);
//     res.status(201).json(result);

//     console.log(req.body);
//   } catch (error) {
//     next(error);
//   }
// });

router.post("/", async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const { error } = contactSchema.validate({ name, email, phone });
    if (error) {
      switch (error.details[0].context.key) {
        case "name":
          return res.status(400).json({ message: "missing required Name field" });
        case "email":
          return res.status(400).json({ message: "missing required Email field" });
        case "phone":
          return res.status(400).json({ message: "missing required Phone field" });
        default:
          return res.status(400).json({ message: "Something went wrong" });
      }
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);

    console.log(req.body);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw HttpError(404, "Contact not found");
    }
    res.status({ message: "Contact deleted" }).json(result);
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw HttpError({ status: 400, message: "missing fields" });
    }

    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, "Contact not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
