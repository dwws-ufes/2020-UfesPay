import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUserCountry1621103346194 implements MigrationInterface {
    name = 'AddUserCountry1621103346194'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "country" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "comment" DROP CONSTRAINT "FK_3ce66469b26697baa097f8da923"
        `);
        await queryRunner.query(`
            ALTER TABLE "comment" DROP CONSTRAINT "REL_3ce66469b26697baa097f8da92"
        `);
        await queryRunner.query(`
            ALTER TABLE "comment"
            ADD CONSTRAINT "FK_3ce66469b26697baa097f8da923" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "comment" DROP CONSTRAINT "FK_3ce66469b26697baa097f8da923"
        `);
        await queryRunner.query(`
            ALTER TABLE "comment"
            ADD CONSTRAINT "REL_3ce66469b26697baa097f8da92" UNIQUE ("author_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "comment"
            ADD CONSTRAINT "FK_3ce66469b26697baa097f8da923" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "country"
        `);
    }

}
