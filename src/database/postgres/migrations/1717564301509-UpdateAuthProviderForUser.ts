import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateAuthProviderForUser1717564301509 implements MigrationInterface {
  name = "UpdateAuthProviderForUser1717564301509";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE "public"."user_auth_provider_enum" AS ENUM(
                'Github',
                'Google',
                'Apple',
                'Twitter',
                'EmailPassword'
            );

            ALTER TABLE "user"
            ADD "auth_provider" "public"."user_auth_provider_enum" NOT NULL DEFAULT 'EmailPassword';

            ALTER TABLE "user"
            ADD "auth_provider_id" character varying
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "auth_provider_id";

            ALTER TABLE "user" DROP COLUMN "auth_provider";

            DROP TYPE "public"."user_auth_provider_enum";
        `);
  }
}
