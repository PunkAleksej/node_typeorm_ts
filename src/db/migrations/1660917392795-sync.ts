import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1660917392795 implements MigrationInterface {
    name = 'sync1660917392795'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "genre" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_0285d4f1655d080cfcf7d1ab141" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "rating" (
                "id" SERIAL NOT NULL,
                "createdAt" TIME WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIME WITH TIME ZONE NOT NULL DEFAULT now(),
                "bookRating" integer NOT NULL,
                "bookIdId" integer NOT NULL,
                "userIdId" integer NOT NULL,
                CONSTRAINT "PK_ecda8ad32645327e4765b43649e" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "author" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_5a0e79799d372fe56f2f3fa6871" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "book" (
                "id" SERIAL NOT NULL,
                "name" character varying,
                "author" character varying,
                "description" character varying,
                "rating" character varying,
                "price" integer,
                "paperPrice" integer,
                "cover" character varying,
                "createAt" TIME WITH TIME ZONE NOT NULL DEFAULT now(),
                "updateAt" TIME WITH TIME ZONE NOT NULL DEFAULT now(),
                "authorId" integer,
                CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "book_genres_genre" (
                "bookId" integer NOT NULL,
                "genreId" integer NOT NULL,
                CONSTRAINT "PK_75a197f32ed39286c5c39198ece" PRIMARY KEY ("bookId", "genreId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_31d658e0af554165f4598158c5" ON "book_genres_genre" ("bookId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_83bd32782d44d9db3d68c3f58c" ON "book_genres_genre" ("genreId")
        `);
        await queryRunner.query(`
            ALTER TABLE "rating"
            ADD CONSTRAINT "FK_6d782d9ddb707cc6a40d95641a8" FOREIGN KEY ("bookIdId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "rating"
            ADD CONSTRAINT "FK_de8f5262203ec13ef5c9cdaea45" FOREIGN KEY ("userIdId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD CONSTRAINT "FK_66a4f0f47943a0d99c16ecf90b2" FOREIGN KEY ("authorId") REFERENCES "author"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genres_genre"
            ADD CONSTRAINT "FK_31d658e0af554165f4598158c55" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genres_genre"
            ADD CONSTRAINT "FK_83bd32782d44d9db3d68c3f58c1" FOREIGN KEY ("genreId") REFERENCES "genre"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book_genres_genre" DROP CONSTRAINT "FK_83bd32782d44d9db3d68c3f58c1"
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genres_genre" DROP CONSTRAINT "FK_31d658e0af554165f4598158c55"
        `);
        await queryRunner.query(`
            ALTER TABLE "book" DROP CONSTRAINT "FK_66a4f0f47943a0d99c16ecf90b2"
        `);
        await queryRunner.query(`
            ALTER TABLE "rating" DROP CONSTRAINT "FK_de8f5262203ec13ef5c9cdaea45"
        `);
        await queryRunner.query(`
            ALTER TABLE "rating" DROP CONSTRAINT "FK_6d782d9ddb707cc6a40d95641a8"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_83bd32782d44d9db3d68c3f58c"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_31d658e0af554165f4598158c5"
        `);
        await queryRunner.query(`
            DROP TABLE "book_genres_genre"
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
            DROP TABLE "genre"
        `);
    }

}