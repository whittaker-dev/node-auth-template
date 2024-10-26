import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateResource1729960791455 implements MigrationInterface {
    name = 'UpdateResource1729960791455'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "resource"
            ALTER COLUMN "file" DROP NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "resource"
            ALTER COLUMN "file"
            SET NOT NULL
        `);
    }

}
