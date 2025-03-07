import mongoose from "mongoose";

export interface IProduct {
   creator: mongoose.Types.ObjectId;  
   title: string;
   subTitle: string;
   slug: string;
   link: string;
   productType: string;
   productAbout: string;  
   tags: string[];
   price: number;
   websiteAge: number;
   status: string;
   images: string[];  
   bannerImageUrl: string;
   bannerImageID: string;
   technologyStack: string[];
   is_featured: boolean;
   category: mongoose.Types.ObjectId[];
   rating: mongoose.Types.ObjectId[];
   offer: mongoose.Types.ObjectId[];
}

const ProductSchema = new mongoose.Schema({
   creator: {  
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User"
   },
   title: {
      type: String,
      required: true,
   },
   subTitle: {
      type: String,
      required: true,
   },
   slug: {
      type: String,
      unique: true,
      required: true,
   },
   link: {
      type: String,
      required: true,
   },
   productType: {
      type: String,
      enum: ["blog", "ecommerce", "portfolio", "service"],
      required: true,
   },
   productAbout: {  
      type: String,
      required: true,
   },
   tags: {
      type: [String],
      required: true,
   },
   price: {
      type: Number,
      default: 0,
      required: true,
   },
   websiteAge: {
      type: Number,
      required: true,
   },
   status: {
      type: String,
      enum: ["inactive", "active", "coming_soon"],  
      default: "coming_soon",
   },
   images: [  
      {
         imageUrl: {
            type: String,
            required: true,
         },
         imageId: {
            type: String,
            required: true,
         },
      }
   ],
   bannerImageUrl: {
      type: String,
      required: true,
   },
   bannerImageID: {
      type: String,
      required: true,
   },
   technologyStack: {
      type: [String],
      required: true,
   },
   is_featured: {
      type: Boolean,
      default: false,
   },
   category: [
      {
         type: mongoose.Types.ObjectId,
         ref: "Category"
      }
   ],
   rating: [
      {
         type: mongoose.Types.ObjectId,
         ref: "Rating"
      }
   ],
   offer: [
      {
         type: mongoose.Types.ObjectId,
         ref: "Offer"
      }
   ]
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
export default Product;