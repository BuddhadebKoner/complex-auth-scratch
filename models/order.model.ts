import mongoose from "mongoose";

export interface IOrder {
   owner: mongoose.Types.ObjectId;
   products: mongoose.Types.ObjectId[];
   totalAmount: number;
   discount: string;
   status: string;
   paymentStatus: string;
   payment: string;
   orderdate: Date;
   paymentDate: Date;
   deliveryDate: Date;
   trackId: string;
   invoiceId: string;
   customerNote: string;
}

const OrderSchema = new mongoose.Schema({
   owner: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
   },
   products: {
      type: [mongoose.Types.ObjectId],
      required: true,
      ref: "Product",
   },
   totalAmount: {
      type: Number,
      default: 0,
      required: true,
   },
   discount: {
      type: String,
      default: "0",
   },
   status: {
      type: String,
      required: true,
      enum: ["pending", "processing", "completed", "cancelled"],
      default: "pending",
   },
   paymentStatus: {
      type: String,
      required: true,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
   },
   payment: {
      type: String,
      required: true,
      enum: ["cod", "card", "netbanking", "upi"],
   },
   orderdate: {
      type: Date,
      default: Date.now,
   },
   paymentDate: {
      type: Date,
   },
   deliveryDate: {
      type: Date,
   },
   trackId: {
      type: String,
      required: true,
   },
   invoiceId: {
      type: String,
   },
   customerNote: {
      type: String,
      default: "",
   },
}, { timestamps: true });

const Order = mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);
export default Order;