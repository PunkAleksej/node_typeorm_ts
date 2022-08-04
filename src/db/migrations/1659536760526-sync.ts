import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1659536760526 implements MigrationInterface {
    name = 'sync1659536760526'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "firstName" character varying,
                "lastName" character varying,
                "email" character varying(150) NOT NULL,
                "password" character varying NOT NULL,
                "DoB" TIME,
                "createAt" TIME WITH TIME ZONE NOT NULL DEFAULT now(),
                "updateAt" TIME WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "user"
        `);
    }

}
