import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRoleUser1716478154941 implements MigrationInterface {
  name = "UpdateRoleUser1716478154941";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE "public"."user_role_enum" AS ENUM('Dev', 'Admin');

            ALTER TABLE "user"
            ADD "role" "public"."user_role_enum" NOT NULL DEFAULT 'Dev'
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "role";

            DROP TYPE "public"."user_role_enum"
        `);
  }
}
