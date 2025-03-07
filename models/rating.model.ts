import mongoose from "mongoose";

export interface IRating {
   user: mongoose.Types.ObjectId;
   product: mongoose.Types.ObjectId;
   rating: number;  
   comment: string;
   likes: mongoose.Types.ObjectId[];
   isFeatured: boolean;
}

const RatingSchema = new mongoose.Schema({
   user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User"
   },
   product: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Product"
   },
   rating: {  // Fixed typo: ratting -> rating
      type: Number,
      required: true,
   },
   comment: {
      type: String,
      required: true,
   },
   likes: {
      type: [mongoose.Types.ObjectId],
      ref: "User"
   },
   isFeatured: {
      type: Boolean,
      default: false,
   },
}, { timestamps: true });

const Rating = mongoose.models.Rating || mongoose.model<IRating>("Rating", RatingSchema);
export default Rating;