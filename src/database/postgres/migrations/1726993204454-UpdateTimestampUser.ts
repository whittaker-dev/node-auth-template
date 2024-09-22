import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTimestampUser1726993204454 implements MigrationInterface {
    name = 'UpdateTimestampUser1726993204454'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone;

            ALTER TABLE "user"
            ADD "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "updated_at";
            ALTER TABLE "user" DROP COLUMN "created_at"
        `);
    }

}
