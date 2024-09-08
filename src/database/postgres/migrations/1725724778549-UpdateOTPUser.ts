import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateOTPUser1725724778549 implements MigrationInterface {
    name = 'UpdateOTPUser1725724778549'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "otp" character varying
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "otp"
        `);
    }

}
