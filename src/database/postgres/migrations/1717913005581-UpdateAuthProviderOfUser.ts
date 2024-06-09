import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateAuthProviderOfUser1717913005581 implements MigrationInterface {
  name = "UpdateAuthProviderOfUser1717913005581";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TYPE "public"."user_auth_provider_enum"
            RENAME TO "user_auth_provider_enum_old";

            CREATE TYPE "public"."user_auth_provider_enum" AS ENUM(
                'Github',
                'Google',
                'Apple',
                'Discord',
                'Twitter',
                'EmailPassword'
            );

            ALTER TABLE "user"
            ALTER COLUMN "auth_provider" DROP DEFAULT;

            ALTER TABLE "user"
            ALTER COLUMN "auth_provider" TYPE "public"."user_auth_provider_enum" USING "auth_provider"::"text"::"public"."user_auth_provider_enum";

            ALTER TABLE "user"
            ALTER COLUMN "auth_provider"
            SET DEFAULT 'EmailPassword';

            DROP TYPE "public"."user_auth_provider_enum_old";

        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE "public"."user_auth_provider_enum_old" AS ENUM(
                'Github',
                'Google',
                'Apple',
                'Twitter',
                'EmailPassword'
            );

            ALTER TABLE "user"
            ALTER COLUMN "auth_provider" DROP DEFAULT;

            ALTER TABLE "user"
            ALTER COLUMN "auth_provider" TYPE "public"."user_auth_provider_enum_old" USING "auth_provider"::"text"::"public"."user_auth_provider_enum_old";

            ALTER TABLE "user"
            ALTER COLUMN "auth_provider"
            SET DEFAULT 'EmailPassword';

            DROP TYPE "public"."user_auth_provider_enum";

            ALTER TYPE "public"."user_auth_provider_enum_old"
            RENAME TO "user_auth_provider_enum";

        `);
  }
}
