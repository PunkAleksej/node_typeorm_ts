import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1662378657216 implements MigrationInterface {
    name = 'sync1662378657216'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "favorite" DROP COLUMN "booksQuantity"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "favorite"
            ADD "booksQuantity" integer NOT NULL
        `);
    }

}
