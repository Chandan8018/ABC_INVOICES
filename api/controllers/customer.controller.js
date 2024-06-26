import Customer from "../models/customer.model.js";
import { errorHandler } from "../utils/error.js";

export const createCustomer = async (req, res, next) => {
  if (
    !req.body.name ||
    !req.body.address ||
    !req.body.state ||
    !req.body.phone ||
    !req.body.email
  ) {
    return next(errorHandler(400, "Please provide all required fields"));
  }
  const newCustomer = new Customer({
    ...req.body,
    userId: req.user.id,
  });
  try {
    const savedCustomer = await newCustomer.save();
    res.status(201).json(savedCustomer);
  } catch (error) {
    next(error);
  }
};

export const getCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.find({});
    if (!customers) {
      return next(errorHandler(404, "Customers not found"));
    }
    res.status(200).json(customers);
  } catch (error) {
    next(error);
  }
};

export const updateCustomer = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to update this post"));
  }
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.customerId,
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          address: req.body.address,
          state: req.body.state,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedCustomer);
  } catch (error) {
    next(error);
  }
};

export const deleteCustomer = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(
      errorHandler(403, "You are not allowed to delete this customer")
    );
  }
  try {
    await Customer.findByIdAndDelete(req.params.customerId);
    res.status(200).json("The customer has been deleted");
  } catch (error) {
    next(error);
  }
};
