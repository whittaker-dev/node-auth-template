import { MigrationInterface, QueryRunner } from "typeorm";

export class AddResourceAndBoard1729931598066 implements MigrationInterface {
    name = 'AddResourceAndBoard1729931598066'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "board_resource" (
                "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,
                "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,
                "deletedAt" TIMESTAMP,
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                CONSTRAINT "PK_3a7cebe1f799f0fe9e776c3a28c" PRIMARY KEY ("id")
            );

            CREATE TABLE "resource" (
                "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,
                "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,
                "deletedAt" TIMESTAMP,
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "title" character varying NOT NULL,
                "description" character varying NOT NULL,
                "link" character varying NOT NULL,
                "file" character varying NOT NULL,
                "is_publish" boolean NOT NULL DEFAULT false,
                "user_id" uuid,
                "resource_id" uuid,
                CONSTRAINT "PK_e2894a5867e06ae2e8889f1173f" PRIMARY KEY ("id")
            );
            ALTER TABLE "subscription_plan"
            ADD "deletedAt" TIMESTAMP;

            ALTER TABLE "user"
            ADD "deletedAt" TIMESTAMP;

            ALTER TABLE "resource"
            ADD CONSTRAINT "FK_91986a65607b20ec6bf14061694" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

            ALTER TABLE "resource"
            ADD CONSTRAINT "FK_1b95660aa570a827fbe216669e3" FOREIGN KEY ("resource_id") REFERENCES "board_resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "resource" DROP CONSTRAINT "FK_1b95660aa570a827fbe216669e3";

            ALTER TABLE "resource" DROP CONSTRAINT "FK_91986a65607b20ec6bf14061694";

            ALTER TABLE "user" DROP COLUMN "deletedAt";

            ALTER TABLE "subscription_plan" DROP COLUMN "deletedAt";

            DROP TABLE "resource";

            DROP TABLE "board_resource";

        `);
    }

}
