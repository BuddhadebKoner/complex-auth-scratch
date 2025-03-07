# E-commerce Platform Data Model

## 1. User

- name: string;
- email: string;
- password: string;
- phone: string;
- address: string;
- role: string;
- otp: string;
- otpExpire: Date;
- resetOtp: string;
- resetOtpExpire: Date;
- isVerified: boolean;
- imageUrl: string;
- imageId: string;
- orders: mongoose.Types.ObjectId[];
- cart: mongoose.Types.ObjectId[];
- products: mongoose.Types.ObjectId[];
- favorite: mongoose.Types.ObjectId[];

## 2. Product

- craeter: mongoose.Types.ObjectId;
- title: string;
- subTitle: string;
- slug: string;
- link: string;
- productType: string;
- producAbout: string;
- tags: string[];
- price: number;
- websiteAge: number;
- status: string;
- iamges: string[];
- bannerImageUrl: string;
- bannerImageID: string;
- technologyStack: string[];
- is_featured: boolean;
- category: mongoose.Types.ObjectId;
- rating: mongoose.Types.ObjectId;
- offer: mongoose.Types.ObjectId;

## 3. Order

- owner: mongoose.Types.ObjectId;
- products: mongoose.Types.ObjectId[];
- totalAmount: number;
- discount: string;
- status: string;
- paymentStatus: string;
- payment: string;
- orderdate: Date;
- paymentDate: Date;
- deliveryDate: Date;
- trackId: string;
- invoiceId: string;
- customerNote: string;

## 4. Category

- owner: mongoose.Types.ObjectId;
- name: string;
- slug: string;
- description: string;
- imageUrl: string;
- imageId: string;
- parent: mongoose.Types.ObjectId;
- isFeatured: boolean;
- products: mongoose.Types.ObjectId[];

## 5. Rating

- id (PK)
- user (FK → User)
- product (FK → Product)
- rating
- comment
- likes
- helpfulness_score
- reply_to
- verified_purchase
- created_at
- updated_at
- images
- sentiment_score
- reported_count
- is_featured
- is_hidden

## 6. Ratting

- user: mongoose.Types.ObjectId;
- product: mongoose.Types.ObjectId;
- ratting: number;
- comment: string;
- likes: mongoose.Types.ObjectId[];

## 7. Offer

- offerName: string;
- description: string;
- status: string;
- type: string;
- discount: Number;
- offerStartDate: Date;
- offerEndDate: Date;
- products: mongoose.Types.ObjectId[];
- isFeatured: boolean;

## 8. Cart

- user: mongoose.Types.ObjectId;
- products: mongoose.Types.ObjectId[];
- quantity: number[];
- totalAmount: number;
- cartCreatedAt: Date;