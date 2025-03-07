import mongoose from "mongoose";

export interface IOffer {
   offerName: string;
   description: string;
   status: string;
   type: string;
   discount: Number;
   offerStartDate: Date;
   offerEndDate: Date;
   products: mongoose.Types.ObjectId[];
}

const OfferSchema = new mongoose.Schema({
   offerName: {
      type: String,
      required: true,
   },
   description: {
      type: String,
      default: "",
   },
   status: {
      type: String,
      required: true,
      enum: ["active", "inactive"],
      default: "active",
   },
   type: {
      type: String,
      required: true,
      enum: ["percentage", "flat"],
   },
   discount: {
      type: Number,
      required: true,
   },
   offerStartDate: {
      type: Date,
      required: true,
   },
   offerEndDate: {
      type: Date,
      required: true,
   },
   products: {
      type: [mongoose.Types.ObjectId],
      required: true,
   },
}, { timestamps: true });

const Offer = mongoose.models.Offer || mongoose.model<IOffer>("Offer", OfferSchema);
export default Offer;