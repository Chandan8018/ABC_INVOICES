import supplier from "../models/supplier.model.js";
import { errorHandler } from "../utils/error.js";

export const createSupplier = async (req, res, next) => {
  if (
    !req.body.address ||
    !req.body.email ||
    !req.body.phone ||
    !req.body.name ||
    !req.body.state
  ) {
    return next(errorHandler(400, "Please provide all required fields"));
  }
  const newSupplier = new supplier({
    ...req.body,
    userId: req.user.id,
  });
  try {
    const savedSupplier = await newSupplier.save();
    res.status(201).json(savedSupplier);
  } catch (error) {
    next(error);
  }
};

export const getSuppliers = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const suppliers = await supplier
      .find({
        ...(req.query.userId && { userId: req.query.userId }),
        ...(req.query.name && { name: req.query.name }),
        ...(req.query.supplierId && { _id: req.query.supplierId }),
      })
      .sort({ updateAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalSuppliers = await supplier.countDocuments();
    res.status(200).json({
      suppliers,
      totalSuppliers,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSupplier = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to update this post"));
  }
  try {
    const updatedSupplier = await supplier.findByIdAndUpdate(
      req.params.supplierId,
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          PAN: req.body.PAN,
          address: req.body.address,
          GST: req.body.GST,
          signature: req.body.signature,
          state: req.body.state,
          country: req.body.country,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedSupplier);
  } catch (error) {
    next(error);
  }
};

export const deleteSupplier = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(
      errorHandler(403, "You are not allowed to delete this supplier")
    );
  }
  try {
    await supplier.findByIdAndDelete(req.params.supplierId);
    res.status(200).json("The supplier has been deleted");
  } catch (error) {
    next(error);
  }
};
