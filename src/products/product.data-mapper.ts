import { Injectable } from '@nestjs/common';
import { ProductEntity } from 'src/products/entities/product.entity';
import { ProductItem } from 'src/products/interfaces/products';

@Injectable()
export class ProductDataMapper {
  toProductItem(product: ProductEntity): ProductItem {
    const {
      availabilityStatus,
      brand,
      category,
      description,
      dimensions,
      discountPercentage,
      externalId: id,
      images,
      meta,
      minimumOrderQuantity,
      price,
      rating,
      returnPolicy,
      reviews,
      shippingInformation,
      sku,
      stock,
      tags,
      thumbnail,
      title,
      warrantyInformation,
      weight,
    } = product;

    return {
      availabilityStatus,
      brand,
      category,
      description,
      dimensions,
      discountPercentage,
      id,
      images,
      meta,
      minimumOrderQuantity,
      price,
      rating,
      returnPolicy,
      reviews,
      shippingInformation,
      sku,
      stock,
      tags,
      thumbnail,
      title,
      warrantyInformation,
      weight,
    };
  }
}
