import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStatusSubscriptionPlan1727501180349 implements MigrationInterface {
    name = 'AddStatusSubscriptionPlan1727501180349'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "subscription_plan"
            ADD "status" character varying NOT NULL DEFAULT 'Pending'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "subscription_plan" DROP COLUMN "status"
        `);
    }

}
