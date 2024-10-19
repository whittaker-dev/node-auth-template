import { MigrationInterface, QueryRunner } from "typeorm";

export class AddExpiredAtSubscription1727508833423 implements MigrationInterface {
    name = 'AddExpiredAtSubscription1727508833423'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "subscription_plan"
            ADD "expired_at" TIMESTAMP
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "subscription_plan" DROP COLUMN "expired_at"
        `);
    }

}
