import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1659605357232 implements MigrationInterface {
    name = 'sync1659605357232'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "photo" character varying
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "photo"
        `);
    }

}
