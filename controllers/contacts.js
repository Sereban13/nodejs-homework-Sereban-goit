// const contacts = require("../models/contacts.json");

const { Contact } = require("../models/contact");
// const { addSchema, updateFavoriteSchema } = require("../utils/contactValidationSchema/contactValidationSchema");
const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, "Contact not found");
  }
  res.json(result);
};

const createContact = async (req, res, next) => {
  // const { name, email, phone } = req.body;
  // const { error } = addSchema.validate({ name, email, phone });
  // if (error) {
  //   throw HttpError(400, error.message);
  // }
  const result = await Contact.create(req.body);
  res.status(201).json(result);

  console.log(req.body);
};

const updateContact = async (req, res, next) => {
  // const { error } = addSchema.validate(req.body);
  // if (error) {
  //   throw HttpError({ status: 400, message: "missing fields" });
  // }

  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Contact not found");
  }
  res.json(result);
};

const updateFavorite = async (req, res, next) => {
  // const { error } = updateFavoriteSchema.validate(req.body);
  // if (error) {
  //   throw HttpError({ status: 400, message: "missing fields" });
  // }

  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Contact not found");
  }
  res.json(result);
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, "Contact not found");
  }
  //   res.status({ message: "Contact deleted" }).json(result);
  res.json({ message: "Contact is now deleted" });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite),
  deleteContact: ctrlWrapper(deleteContact),
};
