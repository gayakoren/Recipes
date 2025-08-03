import { MigrationInterface, QueryRunner } from "typeorm";

export class Generated1753098857238 implements MigrationInterface {
    name = 'Generated1753098857238'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "recipes"."food_type" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" text NOT NULL, CONSTRAINT "PK_c2febc366866907996426867e11" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "recipes"."ingredient" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "amount" text NOT NULL, "unit" text NOT NULL, "recipe_uuid" uuid NOT NULL, CONSTRAINT "PK_d2b6c1f63c9611fb5c142c92df4" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "recipes"."instruction" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "step" smallint NOT NULL, "description" text NOT NULL, "recipe_uuid" uuid NOT NULL, CONSTRAINT "PK_243fda68970cc1e0ab958eae636" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TYPE "recipes"."recipe_difficultylevel_enum" AS ENUM('Easy', 'Medium', 'Hard')`);
        await queryRunner.query(`CREATE TYPE "recipes"."recipe_kosher_enum" AS ENUM('Dairy', 'Meat', 'Parve', 'Not Kosher')`);
        await queryRunner.query(`CREATE TABLE "recipes"."recipe" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "workingTime" smallint NOT NULL, "makingTime" smallint NOT NULL, "difficultyLevel" "recipes"."recipe_difficultylevel_enum" NOT NULL, "kosher" "recipes"."recipe_kosher_enum" NOT NULL, "picture" bytea, CONSTRAINT "PK_550393ff21c21af9084c2e82d60" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "recipes"."food_restriction" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "restriction" text NOT NULL, CONSTRAINT "PK_428557cd9bb891a3973ce4a0151" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "recipes"."recipe_food_types_food_type" ("recipeUuid" uuid NOT NULL, "foodTypeUuid" uuid NOT NULL, CONSTRAINT "PK_5ceced10e5eda2c6dd63182c46e" PRIMARY KEY ("recipeUuid", "foodTypeUuid"))`);
        await queryRunner.query(`CREATE INDEX "IDX_75f22c99a7c7e2881e7ff3d837" ON "recipes"."recipe_food_types_food_type" ("recipeUuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_da54cb676c33b90254a4dcf905" ON "recipes"."recipe_food_types_food_type" ("foodTypeUuid") `);
        await queryRunner.query(`CREATE TABLE "recipes"."recipe_food_restrictions_food_restriction" ("recipeUuid" uuid NOT NULL, "foodRestrictionUuid" uuid NOT NULL, CONSTRAINT "PK_b69df1d3ad993e368dc004d4bf7" PRIMARY KEY ("recipeUuid", "foodRestrictionUuid"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c187eb271dab315fd6a933387b" ON "recipes"."recipe_food_restrictions_food_restriction" ("recipeUuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_e09356a57d77088bf6b281fc0e" ON "recipes"."recipe_food_restrictions_food_restriction" ("foodRestrictionUuid") `);
        await queryRunner.query(`ALTER TABLE "recipes"."ingredient" ADD CONSTRAINT "FK_6b774180ae17e5dee1eb72be4c3" FOREIGN KEY ("recipe_uuid") REFERENCES "recipes"."recipe"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipes"."instruction" ADD CONSTRAINT "FK_859ad745ee133b0580414557fba" FOREIGN KEY ("recipe_uuid") REFERENCES "recipes"."recipe"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipes"."recipe_food_types_food_type" ADD CONSTRAINT "FK_75f22c99a7c7e2881e7ff3d8370" FOREIGN KEY ("recipeUuid") REFERENCES "recipes"."recipe"("uuid") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "recipes"."recipe_food_types_food_type" ADD CONSTRAINT "FK_da54cb676c33b90254a4dcf9057" FOREIGN KEY ("foodTypeUuid") REFERENCES "recipes"."food_type"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipes"."recipe_food_restrictions_food_restriction" ADD CONSTRAINT "FK_c187eb271dab315fd6a933387b0" FOREIGN KEY ("recipeUuid") REFERENCES "recipes"."recipe"("uuid") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "recipes"."recipe_food_restrictions_food_restriction" ADD CONSTRAINT "FK_e09356a57d77088bf6b281fc0e0" FOREIGN KEY ("foodRestrictionUuid") REFERENCES "recipes"."food_restriction"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes"."recipe_food_restrictions_food_restriction" DROP CONSTRAINT "FK_e09356a57d77088bf6b281fc0e0"`);
        await queryRunner.query(`ALTER TABLE "recipes"."recipe_food_restrictions_food_restriction" DROP CONSTRAINT "FK_c187eb271dab315fd6a933387b0"`);
        await queryRunner.query(`ALTER TABLE "recipes"."recipe_food_types_food_type" DROP CONSTRAINT "FK_da54cb676c33b90254a4dcf9057"`);
        await queryRunner.query(`ALTER TABLE "recipes"."recipe_food_types_food_type" DROP CONSTRAINT "FK_75f22c99a7c7e2881e7ff3d8370"`);
        await queryRunner.query(`ALTER TABLE "recipes"."instruction" DROP CONSTRAINT "FK_859ad745ee133b0580414557fba"`);
        await queryRunner.query(`ALTER TABLE "recipes"."ingredient" DROP CONSTRAINT "FK_6b774180ae17e5dee1eb72be4c3"`);
        await queryRunner.query(`DROP INDEX "recipes"."IDX_e09356a57d77088bf6b281fc0e"`);
        await queryRunner.query(`DROP INDEX "recipes"."IDX_c187eb271dab315fd6a933387b"`);
        await queryRunner.query(`DROP TABLE "recipes"."recipe_food_restrictions_food_restriction"`);
        await queryRunner.query(`DROP INDEX "recipes"."IDX_da54cb676c33b90254a4dcf905"`);
        await queryRunner.query(`DROP INDEX "recipes"."IDX_75f22c99a7c7e2881e7ff3d837"`);
        await queryRunner.query(`DROP TABLE "recipes"."recipe_food_types_food_type"`);
        await queryRunner.query(`DROP TABLE "recipes"."food_restriction"`);
        await queryRunner.query(`DROP TABLE "recipes"."recipe"`);
        await queryRunner.query(`DROP TYPE "recipes"."recipe_kosher_enum"`);
        await queryRunner.query(`DROP TYPE "recipes"."recipe_difficultylevel_enum"`);
        await queryRunner.query(`DROP TABLE "recipes"."instruction"`);
        await queryRunner.query(`DROP TABLE "recipes"."ingredient"`);
        await queryRunner.query(`DROP TABLE "recipes"."food_type"`);
    }

}
