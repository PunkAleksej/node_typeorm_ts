import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1661172117401 implements MigrationInterface {
    name = 'sync1661172117401'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "genre" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                CONSTRAINT "PK_0285d4f1655d080cfcf7d1ab141" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "photo" (
                "id" SERIAL NOT NULL,
                "bookId" integer,
                "userId" integer,
                CONSTRAINT "PK_723fa50bf70dcfd06fb5a44d4ff" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "firstName" character varying,
                "lastName" character varying,
                "photo" character varying,
                "email" character varying(150) NOT NULL,
                "password" character varying NOT NULL,
                "DoB" TIME,
                "createAt" TIME WITH TIME ZONE NOT NULL DEFAULT now(),
                "updateAt" TIME WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "rating" (
                "id" SERIAL NOT NULL,
                "bookRating" integer NOT NULL,
                "bookId" integer NOT NULL,
                "userId" integer NOT NULL,
                CONSTRAINT "PK_ecda8ad32645327e4765b43649e" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "author" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "bookId" integer,
                CONSTRAINT "PK_5a0e79799d372fe56f2f3fa6871" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "book" (
                "id" SERIAL NOT NULL,
                "name" character varying,
                "description" character varying,
                "price" integer,
                "paperPrice" integer,
                "releasedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "cover" character varying,
                CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "photo"
            ADD CONSTRAINT "FK_fd35f8c468423bb8ffcea4a2ab3" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "photo"
            ADD CONSTRAINT "FK_4494006ff358f754d07df5ccc87" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "rating"
            ADD CONSTRAINT "FK_2ab7f7fc5b63b0147591ba69032" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "rating"
            ADD CONSTRAINT "FK_a6c53dfc89ba3188b389ef29a62" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "author"
            ADD CONSTRAINT "FK_2629cb97e30d08a66fe6ddd0633" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "author" DROP CONSTRAINT "FK_2629cb97e30d08a66fe6ddd0633"
        `);
        await queryRunner.query(`
            ALTER TABLE "rating" DROP CONSTRAINT "FK_a6c53dfc89ba3188b389ef29a62"
        `);
        await queryRunner.query(`
            ALTER TABLE "rating" DROP CONSTRAINT "FK_2ab7f7fc5b63b0147591ba69032"
        `);
        await queryRunner.query(`
            ALTER TABLE "photo" DROP CONSTRAINT "FK_4494006ff358f754d07df5ccc87"
        `);
        await queryRunner.query(`
            ALTER TABLE "photo" DROP CONSTRAINT "FK_fd35f8c468423bb8ffcea4a2ab3"
        `);
        await queryRunner.query(`
            DROP TABLE "book"
        `);
        await queryRunner.query(`
            DROP TABLE "author"
        `);
        await queryRunner.query(`
            DROP TABLE "rating"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TABLE "photo"
        `);
        await queryRunner.query(`
            DROP TABLE "genre"
        `);
    }

}
