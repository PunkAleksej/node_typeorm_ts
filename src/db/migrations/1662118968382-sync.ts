import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1662118968382 implements MigrationInterface {
    name = 'sync1662118968382'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "cart" (
                "id" SERIAL NOT NULL,
                "booksQuantity" integer NOT NULL,
                "bookId" integer NOT NULL,
                "userId" integer NOT NULL,
                CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "cart"
            ADD CONSTRAINT "FK_15605eba0be4c6669389090dd15" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "cart"
            ADD CONSTRAINT "FK_756f53ab9466eb52a52619ee019" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "cart" DROP CONSTRAINT "FK_756f53ab9466eb52a52619ee019"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart" DROP CONSTRAINT "FK_15605eba0be4c6669389090dd15"
        `);
        await queryRunner.query(`
            DROP TABLE "cart"
        `);
    }

}
