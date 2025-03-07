import mongoose from "mongoose";

export interface ICart {
   user: mongoose.Types.ObjectId;
   products: mongoose.Types.ObjectId[];
   quantity: number[];
   totalAmount: number;
   cartCreatedAt: Date;
}

const CartSchema = new mongoose.Schema({
   user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User"
   },
   products: {
      type: [mongoose.Types.ObjectId],
      required: true,
      ref: "Product"
   },
   quantity: {
      type: [Number],
      required: true,
   },
   totalAmount: {
      type: Number,
      default: 0,
      required: true,
   },
   cartCreatedAt: {
      type: Date,
      default: Date.now,
   },
}, { timestamps: true });

const Cart = mongoose.models.Cart || mongoose.model<ICart>("Cart", CartSchema);
export default Cart;