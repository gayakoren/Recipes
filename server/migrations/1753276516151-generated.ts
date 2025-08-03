import { MigrationInterface, QueryRunner } from "typeorm";

export class Generated1753276516151 implements MigrationInterface {
    name = 'Generated1753276516151'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes"."ingredient" ADD "createDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "recipes"."ingredient" ADD "deleteDate" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "recipes"."instruction" ADD "createDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "recipes"."instruction" ADD "deleteDate" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "recipes"."recipe" ADD "createDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "recipes"."recipe" ADD "deleteDate" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes"."recipe" DROP COLUMN "deleteDate"`);
        await queryRunner.query(`ALTER TABLE "recipes"."recipe" DROP COLUMN "createDate"`);
        await queryRunner.query(`ALTER TABLE "recipes"."instruction" DROP COLUMN "deleteDate"`);
        await queryRunner.query(`ALTER TABLE "recipes"."instruction" DROP COLUMN "createDate"`);
        await queryRunner.query(`ALTER TABLE "recipes"."ingredient" DROP COLUMN "deleteDate"`);
        await queryRunner.query(`ALTER TABLE "recipes"."ingredient" DROP COLUMN "createDate"`);
    }

}
