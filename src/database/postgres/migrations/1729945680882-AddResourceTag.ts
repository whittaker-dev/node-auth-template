import { MigrationInterface, QueryRunner } from "typeorm";

export class AddResourceTag1729945680882 implements MigrationInterface {
    name = 'AddResourceTag1729945680882'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "resource_tag" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,
                "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,
                "deletedAt" TIMESTAMP,
                "name" character varying NOT NULL,
                CONSTRAINT "PK_647f58a7d1fc3f54fc6f636a8a3" PRIMARY KEY ("id")
            );

             CREATE TABLE "resources_tags" (
                "tag_id" uuid NOT NULL,
                "resource_id" uuid NOT NULL,
                CONSTRAINT "PK_3291cb3626804ff15587405610b" PRIMARY KEY ("tag_id", "resource_id")
            );

            CREATE INDEX "IDX_377b9233b0c4668ed6226a4017" ON "resources_tags" ("tag_id");

            CREATE INDEX "IDX_95a86ef350fd4229288dcb01a2" ON "resources_tags" ("resource_id");

            ALTER TABLE "resources_tags"
            ADD CONSTRAINT "FK_377b9233b0c4668ed6226a40175" FOREIGN KEY ("tag_id") REFERENCES "resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;
            
            ALTER TABLE "resources_tags"
            ADD CONSTRAINT "FK_95a86ef350fd4229288dcb01a22" FOREIGN KEY ("resource_id") REFERENCES "resource_tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "resources_tags" DROP CONSTRAINT "FK_95a86ef350fd4229288dcb01a22";

            ALTER TABLE "resources_tags" DROP CONSTRAINT "FK_377b9233b0c4668ed6226a40175";

            DROP INDEX "public"."IDX_95a86ef350fd4229288dcb01a2";

            DROP INDEX "public"."IDX_377b9233b0c4668ed6226a4017";

            DROP TABLE "resources_tags";

            DROP TABLE "resource_tag";
        `);
    }

}
