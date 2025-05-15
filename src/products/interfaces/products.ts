export enum ProductCategory {
  Beauty = 'beauty',
  Fragrances = 'fragrances',
  Furniture = 'furniture',
  Groceries = 'groceries',
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

export interface BasicProductItem {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: ProductDimensionsItem;
  warrantyInformation: string;
  shippingInformation: string;
  reviews: ProductReviewItem[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: ProductMetaItem;
  thumbnail: string;
  images: string[];
}

export interface ProductItem extends BasicProductItem {
  category: ProductCategory;
  availabilityStatus: ProductAvailabilityStatus;
}

export interface ImportProductsData {
  limit?: number;
  skip?: number;
}

export interface ImportProductsResult {
  message: string;
  success: boolean;
}

export interface ProductRawItem extends BasicProductItem {
  category: string;
  availabilityStatus: string;
}

export interface ProductRawDataResponse {
  products: ProductRawItem[];
}
