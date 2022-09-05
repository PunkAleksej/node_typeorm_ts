import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1662378048344 implements MigrationInterface {
    name = 'sync1662378048344'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "favorite" (
                "id" SERIAL NOT NULL,
                "booksQuantity" integer NOT NULL,
                "bookId" integer NOT NULL,
                "userId" integer NOT NULL,
                CONSTRAINT "PK_495675cec4fb09666704e4f610f" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "favorite"
            ADD CONSTRAINT "FK_8051682e9969f260b6832449a0f" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "favorite"
            ADD CONSTRAINT "FK_83b775fdebbe24c29b2b5831f2d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "favorite" DROP CONSTRAINT "FK_83b775fdebbe24c29b2b5831f2d"
        `);
        await queryRunner.query(`
            ALTER TABLE "favorite" DROP CONSTRAINT "FK_8051682e9969f260b6832449a0f"
        `);
        await queryRunner.query(`
            DROP TABLE "favorite"
        `);
    }

}
