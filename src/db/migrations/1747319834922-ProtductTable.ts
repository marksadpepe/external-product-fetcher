import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProtductTable1747319834922 implements MigrationInterface {
  name = 'ProtductTable1747319834922';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."product_category_enum" AS ENUM('beauty', 'fragrances', 'furniture', 'groceries')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."product_tags_enum" AS ENUM('beauty', 'mascara', 'eyeshadow', 'face powder', 'lipstick', 'nail polish', 'fragrances', 'perfumes', 'furniture', 'beds', 'sofas', 'bedside tables', 'office chairs', 'bathroom', 'fruits', 'meat', 'pet supplies', 'cat food', 'dog food', 'cooking essentials', 'vegetables', 'dairy', 'seafood', 'condiments', 'desserts')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."product_availabilitystatus_enum" AS ENUM('In Stock', 'Low Stock')`,
    );
    await queryRunner.query(
      `CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "category" "public"."product_category_enum" NOT NULL, "price" integer NOT NULL, "discountPercentage" integer NOT NULL, "rating" integer NOT NULL, "stock" integer NOT NULL, "tags" "public"."product_tags_enum" array NOT NULL DEFAULT '{}', "brand" character varying NOT NULL, "sku" character varying NOT NULL, "weight" integer NOT NULL, "dimensions" json NOT NULL, "warrantyInformation" character varying NOT NULL, "shippingInformation" character varying NOT NULL, "availabilityStatus" "public"."product_availabilitystatus_enum" NOT NULL, "reviews" json array NOT NULL, "returnPolicy" character varying NOT NULL, "minimumOrderQuantity" integer NOT NULL, "meta" json NOT NULL, "images" text array NOT NULL, "thumbnail" character varying NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "product"`);
    await queryRunner.query(
      `DROP TYPE "public"."product_availabilitystatus_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."product_tags_enum"`);
    await queryRunner.query(`DROP TYPE "public"."product_category_enum"`);
  }
}
