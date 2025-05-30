import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProtductTable1747347772018 implements MigrationInterface {
  name = 'ProtductTable1747347772018';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."product_category_enum" AS ENUM('beauty', 'fragrances', 'furniture', 'groceries')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."product_availabilitystatus_enum" AS ENUM('In Stock', 'Low Stock')`,
    );
    await queryRunner.query(
      `CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "externalId" integer NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "category" "public"."product_category_enum" NOT NULL, "price" numeric(10,2) NOT NULL, "discountPercentage" numeric(10,2) NOT NULL, "rating" numeric(10,2) NOT NULL, "stock" integer NOT NULL, "tags" character varying(64) array NOT NULL, "brand" character varying NOT NULL, "sku" character varying NOT NULL, "weight" integer NOT NULL, "dimensions" json NOT NULL, "warrantyInformation" character varying NOT NULL, "shippingInformation" character varying NOT NULL, "availabilityStatus" "public"."product_availabilitystatus_enum" NOT NULL, "reviews" jsonb NOT NULL, "returnPolicy" character varying NOT NULL, "minimumOrderQuantity" integer NOT NULL, "meta" json NOT NULL, "images" text array NOT NULL, "thumbnail" character varying NOT NULL, CONSTRAINT "UQ_e24aee441e4b823ad5275b1444a" UNIQUE ("externalId"), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "product"`);
    await queryRunner.query(
      `DROP TYPE "public"."product_availabilitystatus_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."product_category_enum"`);
  }
}
