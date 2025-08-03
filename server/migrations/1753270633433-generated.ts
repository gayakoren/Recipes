import { MigrationInterface, QueryRunner } from "typeorm";

export class Generated1753270633433 implements MigrationInterface {
    name = 'Generated1753270633433'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes"."instruction" ADD CONSTRAINT "UQ_7273e3f392adc9b764ae19a3b7f" UNIQUE ("recipe_uuid", "step")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes"."instruction" DROP CONSTRAINT "UQ_7273e3f392adc9b764ae19a3b7f"`);
    }

}
