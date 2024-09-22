import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSubscription1726995832572 implements MigrationInterface {
    name = 'CreateSubscription1726995832572'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "subscription_plan" (
                "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,
                "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "type" character varying NOT NULL DEFAULT 'FreeTrial',
                "stripe_subscription_id" character varying,
                "is_default" boolean NOT NULL DEFAULT true,
                "user_id" uuid,
                CONSTRAINT "PK_5fde988e5d9b9a522d70ebec27c" PRIMARY KEY ("id")
            );
            ALTER TABLE "subscription_plan"
            ADD CONSTRAINT "FK_99525826c3ee9fffbe9740320d1" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "subscription_plan" DROP CONSTRAINT "FK_99525826c3ee9fffbe9740320d1";
            DROP TABLE "subscription_plan"
        `);
    }

}
