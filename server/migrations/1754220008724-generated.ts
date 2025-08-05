import { MigrationInterface, QueryRunner } from "typeorm";

export class Generated1754220008724 implements MigrationInterface {
    name = 'Generated1754220008724'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes"."food_type" ADD "pictureUrl" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes"."food_type" DROP COLUMN "pictureUrl"`);
    }

}
