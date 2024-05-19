import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEmailPasswordUser1716113561951 implements MigrationInterface {
  name = "AddEmailPasswordUser1716113561951";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user"
            ADD "email" character varying NOT NULL;

            ALTER TABLE "user"
            ADD "password" character varying
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "password";

            ALTER TABLE "user" DROP COLUMN "email"
        `);
  }
}
