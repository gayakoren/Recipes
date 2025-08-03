import { DataSource } from 'typeorm';
import { FoodRestriction } from './food-restriction/FoodRestriction.entity';
import { FoodType } from './food-type/FoodType.entity';
import { Ingredient } from './ingredient/Ingredient.entity';
import { Recipe } from './recipe/Recipe.entity';
import { Instruction } from './instruction/Instruction.entity';

export const AppDataSource = new DataSource({
  type: 'postgres', 
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'postgres',
  schema: 'recipes',
  synchronize: false, 
  logging: true,
  entities: [FoodRestriction, FoodType, Ingredient, Recipe, Instruction],
  migrations: ['migrations/**/*.ts'],
});
