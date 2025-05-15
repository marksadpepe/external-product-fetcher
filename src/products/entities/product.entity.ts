import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import {
  ProductAvailabilityStatus,
  ProductCategory,
  ProductDimensionsItem,
  ProductMetaItem,
  ProductReviewItem,
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

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  discountPercentage: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  rating: number;

  @Column()
  stock: number;

  @Column({ type: 'varchar', length: 64, array: true })
  tags: string[];

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

  @Column({ type: 'jsonb' })
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
