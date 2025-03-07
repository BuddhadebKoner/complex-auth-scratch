import mongoose from "mongoose";

export interface ICategory {
   owner: mongoose.Types.ObjectId;
   name: string;
   slug: string;
   description: string;
   imageUrl: string;
   imageId: string;
   parent: mongoose.Types.ObjectId;
   isFeatured: boolean;
   products: mongoose.Types.ObjectId[];
}

const CategorySchema = new mongoose.Schema({
   owner: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User"
   },
   name: {
      type: String,
      required: true,
   },
   slug: {
      type: String,
      unique: true,
      required: true,
   },
   description: {
      type: String,
      required: true,
   },
   imageUrl: {
      type: String,
      required: true,
   },
   imageId: {
      type: String,
      required: true,
   },
   parent: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Category"
   },
   isFeatured: {
      type: Boolean,
      default: false,
   },
   products: {
      type: [mongoose.Types.ObjectId],
      required: true,
      ref: "Product"
   },
}, { timestamps: true });

const Category = mongoose.models.Category || mongoose.model<ICategory>("Category", CategorySchema);
export default Category;