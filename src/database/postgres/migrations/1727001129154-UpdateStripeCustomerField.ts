import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateStripeCustomerField1727001129154 implements MigrationInterface {
    name = 'UpdateStripeCustomerField1727001129154'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "stripe_customer_id" character varying
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "stripe_customer_id"
        `);
    }

}
