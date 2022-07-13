import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1657716956987 implements MigrationInterface {
    name = 'sync1657716956987'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "createAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "updateAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "updateAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "createAt"
        `);
    }

}
