import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEmailVerified1716114988208 implements MigrationInterface {
  name = "AddEmailVerified1716114988208";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user"
            ADD "email_verified" boolean NOT NULL DEFAULT false
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "email_verified"
        `);
  }
}
