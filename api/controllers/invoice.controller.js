import Invoice from "../models/invoice.model.js";
import { errorHandler } from "../utils/error.js";

export const createInvoice = async (req, res, next) => {
  const newInvoice = new Invoice({
    ...req.body,
    userId: req.user.id,
  });
  try {
    const savedInvoice = await newInvoice.save();
    res.status(201).json(savedInvoice);
  } catch (error) {
    next(error);
  }
};

export const getInvoices = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const invoices = await Invoice.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.invoiceId && { _id: req.query.invoiceId }),
    })
      .sort({ updateAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    res.status(200).json(invoices);
  } catch (error) {
    next(error);
  }
};

export const deleteInvoice = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(
      errorHandler(403, "You are not allowed to delete this customer")
    );
  }
  try {
    await Invoice.findByIdAndDelete(req.params.invoiceId);
    res.status(200).json("The Invoice has been deleted");
  } catch (error) {
    next(error);
  }
};
