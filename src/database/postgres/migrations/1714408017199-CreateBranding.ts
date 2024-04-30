import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBranding1714408017199 implements MigrationInterface {
  name = "CreateBranding1714408017199";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "branding" (
                "id" SERIAL NOT NULL,
                "color" character varying,
                "user_id" uuid,
                CONSTRAINT "REL_0cabf8d9f16542febd8d64e34e" UNIQUE ("user_id"),
                CONSTRAINT "PK_e25f376c40ba766f4008a88bbc9" PRIMARY KEY ("id")
            );

            ALTER TABLE "branding"
            ADD CONSTRAINT "FK_0cabf8d9f16542febd8d64e34ec" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "branding" DROP CONSTRAINT "FK_0cabf8d9f16542febd8d64e34ec";

            DROP TABLE "branding"
        `);
  }
}
