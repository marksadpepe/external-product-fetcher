import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import {
  ProductAvailabilityStatus,
  ProductCategory,
  ProductDimensionsItem,
  ProductMetaItem,
  ProductReviewItem,
  ProductTag,
} from 'src/products/interfaces/products';

@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: ProductCategory })
  category: ProductCategory;

  @Column()
  price: number;

  @Column()
  discountPercentage: number;

  @Column()
  rating: number;

  @Column()
  stock: number;

  @Column({ type: 'enum', enum: ProductTag, array: true, default: [] })
  tags: ProductTag[];

  @Column()
  brand: string;

  @Column()
  sku: string;

  @Column()
  weight: number;

  @Column({ type: 'json' })
  dimensions: ProductDimensionsItem;

  @Column()
  warrantyInformation: string;

  @Column()
  shippingInformation: string;

  @Column({ type: 'enum', enum: ProductAvailabilityStatus })
  availabilityStatus: ProductAvailabilityStatus;

  @Column({ type: 'json', array: true })
  reviews: ProductReviewItem[];

  @Column()
  returnPolicy: string;

  @Column()
  minimumOrderQuantity: number;

  @Column({ type: 'json' })
  meta: ProductMetaItem;

  @Column({ type: 'text', array: true })
  images: string[];

  @Column()
  thumbnail: string;
}
