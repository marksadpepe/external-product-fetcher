export enum ProductCategory {
  Beauty = 'beauty',
  Fragrances = 'fragrances',
  Furniture = 'furniture',
  Groceries = 'groceries',
}

export enum ProductTag {
  Beauty = 'beauty',
  Mascara = 'mascara',
  Eyeshadow = 'eyeshadow',
  FacePowder = 'face powder',
  Lipstick = 'lipstick',
  NailPolish = 'nail polish',
  Fragrances = 'fragrances',
  Perfumes = 'perfumes',
  Furniture = 'furniture',
  Beds = 'beds',
  Sofas = 'sofas',
  BedsideTables = 'bedside tables',
  OfficeChairs = 'office chairs',
  Bathroom = 'bathroom',
  Fruits = 'fruits',
  Meat = 'meat',
  PetSupplies = 'pet supplies',
  CatFood = 'cat food',
  DogFood = 'dog food',
  CookingEssentials = 'cooking essentials',
  Vegetables = 'vegetables',
  Dairy = 'dairy',
  Seafood = 'seafood',
  Condiments = 'condiments',
  Desserts = 'desserts',
}

export enum ProductAvailabilityStatus {
  InStock = 'In Stock',
  LowStock = 'Low Stock',
}

export interface ProductDimensionsItem {
  width: number;
  height: number;
  depth: number;
}

export interface ProductReviewItem {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface ProductMetaItem {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export interface ProductItem {
  id: number;
  title: string;
  description: string;
  category: ProductCategory;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: ProductTag[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: ProductDimensionsItem;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: ProductAvailabilityStatus;
  reviews: ProductReviewItem[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: ProductMetaItem;
  images: string[];
  thumbnail: string;
}
