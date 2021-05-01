import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTables1619899613273 implements MigrationInterface {
    name = 'CreateTables1619899613273'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "wallet" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "balance" integer NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_bec464dd8d54c39c54fd32e2334" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                "wallet_id" uuid NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "REL_b453ec3d9d579f6b9699be98be" UNIQUE ("wallet_id"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "comment" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "text" character varying NOT NULL,
                "author_id" uuid NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "REL_3ce66469b26697baa097f8da92" UNIQUE ("author_id"),
                CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "transaction" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "message" character varying NOT NULL,
                "value" integer NOT NULL,
                "emitter_id" uuid NOT NULL,
                "receiver_id" uuid NOT NULL,
                "likes_id" character varying NOT NULL,
                "comments_id" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "REL_29d628c88c24beafd67e9f2653" UNIQUE ("emitter_id"),
                CONSTRAINT "REL_7f8c694d3eb02b8fc73d85b033" UNIQUE ("receiver_id"),
                CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "FK_b453ec3d9d579f6b9699be98beb" FOREIGN KEY ("wallet_id") REFERENCES "wallet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "comment"
            ADD CONSTRAINT "FK_3ce66469b26697baa097f8da923" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "transaction"
            ADD CONSTRAINT "FK_29d628c88c24beafd67e9f26539" FOREIGN KEY ("emitter_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "transaction"
            ADD CONSTRAINT "FK_7f8c694d3eb02b8fc73d85b0330" FOREIGN KEY ("receiver_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "transaction" DROP CONSTRAINT "FK_7f8c694d3eb02b8fc73d85b0330"
        `);
        await queryRunner.query(`
            ALTER TABLE "transaction" DROP CONSTRAINT "FK_29d628c88c24beafd67e9f26539"
        `);
        await queryRunner.query(`
            ALTER TABLE "comment" DROP CONSTRAINT "FK_3ce66469b26697baa097f8da923"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "FK_b453ec3d9d579f6b9699be98beb"
        `);
        await queryRunner.query(`
            DROP TABLE "transaction"
        `);
        await queryRunner.query(`
            DROP TABLE "comment"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TABLE "wallet"
        `);
    }

}
