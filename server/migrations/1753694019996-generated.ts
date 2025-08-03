import { MigrationInterface, QueryRunner } from "typeorm";

export class Generated1753694019996 implements MigrationInterface {
    name = 'Generated1753694019996'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes"."recipe" RENAME COLUMN "picture" TO "pictureUrl"`);
        await queryRunner.query(`ALTER TABLE "recipes"."recipe" DROP COLUMN "pictureUrl"`);
        await queryRunner.query(`ALTER TABLE "recipes"."recipe" ADD "pictureUrl" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes"."recipe" DROP COLUMN "pictureUrl"`);
        await queryRunner.query(`ALTER TABLE "recipes"."recipe" ADD "pictureUrl" bytea`);
        await queryRunner.query(`ALTER TABLE "recipes"."recipe" RENAME COLUMN "pictureUrl" TO "picture"`);
    }

}
