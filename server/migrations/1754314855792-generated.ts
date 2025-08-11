import { MigrationInterface, QueryRunner } from "typeorm";

export class Generated1754314855792 implements MigrationInterface {
    name = 'Generated1754314855792'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "recipes"."recipe_difficultylevel_enum" RENAME TO "recipe_difficultylevel_enum_old"`);
        await queryRunner.query(`CREATE TYPE "recipes"."recipe_difficultylevel_enum" AS ENUM('קל', 'בינוני', 'קשה')`);
        await queryRunner.query(`ALTER TABLE "recipes"."recipe" ALTER COLUMN "difficultyLevel" TYPE "recipes"."recipe_difficultylevel_enum" USING "difficultyLevel"::"text"::"recipes"."recipe_difficultylevel_enum"`);
        await queryRunner.query(`DROP TYPE "recipes"."recipe_difficultylevel_enum_old"`);
        await queryRunner.query(`ALTER TYPE "recipes"."recipe_kosher_enum" RENAME TO "recipe_kosher_enum_old"`);
        await queryRunner.query(`CREATE TYPE "recipes"."recipe_kosher_enum" AS ENUM('חלבי', 'בשרי', 'פרווה', 'לא כשר')`);
        await queryRunner.query(`ALTER TABLE "recipes"."recipe" ALTER COLUMN "kosher" TYPE "recipes"."recipe_kosher_enum" USING "kosher"::"text"::"recipes"."recipe_kosher_enum"`);
        await queryRunner.query(`DROP TYPE "recipes"."recipe_kosher_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "recipes"."recipe_kosher_enum_old" AS ENUM('Dairy', 'Meat', 'Not Kosher', 'Parve')`);
        await queryRunner.query(`ALTER TABLE "recipes"."recipe" ALTER COLUMN "kosher" TYPE "recipes"."recipe_kosher_enum_old" USING "kosher"::"text"::"recipes"."recipe_kosher_enum_old"`);
        await queryRunner.query(`DROP TYPE "recipes"."recipe_kosher_enum"`);
        await queryRunner.query(`ALTER TYPE "recipes"."recipe_kosher_enum_old" RENAME TO "recipe_kosher_enum"`);
        await queryRunner.query(`CREATE TYPE "recipes"."recipe_difficultylevel_enum_old" AS ENUM('Easy', 'Hard', 'Medium')`);
        await queryRunner.query(`ALTER TABLE "recipes"."recipe" ALTER COLUMN "difficultyLevel" TYPE "recipes"."recipe_difficultylevel_enum_old" USING "difficultyLevel"::"text"::"recipes"."recipe_difficultylevel_enum_old"`);
        await queryRunner.query(`DROP TYPE "recipes"."recipe_difficultylevel_enum"`);
        await queryRunner.query(`ALTER TYPE "recipes"."recipe_difficultylevel_enum_old" RENAME TO "recipe_difficultylevel_enum"`);
    }

}
