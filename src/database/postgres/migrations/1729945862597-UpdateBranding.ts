import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateBranding1729945862597 implements MigrationInterface {
    name = 'UpdateBranding1729945862597'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "branding"
            ADD "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone;

            ALTER TABLE "branding"
            ADD "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone;

            ALTER TABLE "branding"
            ADD "deletedAt" TIMESTAMP;
            ALTER TABLE "branding" DROP CONSTRAINT "PK_e25f376c40ba766f4008a88bbc9";

            ALTER TABLE "branding" DROP COLUMN "id";

            ALTER TABLE "branding"
            ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4();

            ALTER TABLE "branding"
            ADD CONSTRAINT "PK_e25f376c40ba766f4008a88bbc9" PRIMARY KEY ("id");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "branding" DROP CONSTRAINT "PK_e25f376c40ba766f4008a88bbc9";

            ALTER TABLE "branding" DROP COLUMN "id";

            ALTER TABLE "branding"
            ADD "id" SERIAL NOT NULL;

            ALTER TABLE "branding"
            ADD CONSTRAINT "PK_e25f376c40ba766f4008a88bbc9" PRIMARY KEY ("id");

            ALTER TABLE "branding" DROP COLUMN "deletedAt";

            ALTER TABLE "branding" DROP COLUMN "updated_at";

            ALTER TABLE "branding" DROP COLUMN "created_at";
        `);
    }

}
