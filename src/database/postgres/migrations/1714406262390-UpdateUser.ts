import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUser1714406262390 implements MigrationInterface {
  name = "UpdateUser1714406262390";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user"
            ADD "user_name" character varying NOT NULL;

            ALTER TABLE "user"
            ADD CONSTRAINT "UQ_d34106f8ec1ebaf66f4f8609dd6" UNIQUE ("user_name");

            ALTER TABLE "user"
            ADD "website_url" character varying;

            ALTER TABLE "user"
            ADD "bio" character varying;

            ALTER TABLE "user"
            ADD "location" character varying;

            CREATE INDEX "IDX_065d4d8f3b5adb4a08841eae3c" ON "user" ("name");
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP INDEX "public"."IDX_065d4d8f3b5adb4a08841eae3c";

            ALTER TABLE "user" DROP COLUMN "location";

            ALTER TABLE "user" DROP COLUMN "bio";

            ALTER TABLE "user" DROP COLUMN "website_url";

            ALTER TABLE "user" DROP CONSTRAINT "UQ_d34106f8ec1ebaf66f4f8609dd6";

            ALTER TABLE "user" DROP COLUMN "user_name";
        `);
  }
}
