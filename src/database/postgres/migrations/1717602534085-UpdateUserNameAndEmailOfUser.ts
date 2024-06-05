import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserNameAndEmailOfUser1717602534085 implements MigrationInterface {
  name = "UpdateUserNameAndEmailOfUser1717602534085";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "email" DROP NOT NULL;

            ALTER TABLE "user"
            ALTER COLUMN "user_name" DROP NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "user_name"
            SET NOT NULL;

            ALTER TABLE "user"
            ALTER COLUMN "email"
            SET NOT NULL
        `);
  }
}
