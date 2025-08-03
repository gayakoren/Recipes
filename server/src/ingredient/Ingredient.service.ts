import e from 'express';
import { AppDataSource } from '../data-source';
import { Ingredient } from './Ingredient.entity';

const ingredientRepo = AppDataSource.getRepository(Ingredient);

export const createIngredient = (ingredientData: Ingredient): Promise<Ingredient> => {
  const newIngredient = ingredientRepo.create(ingredientData);
  return ingredientRepo.save(newIngredient);
};

export const getIngredientsByRecipeId = (recipeUuid: string): Promise<Ingredient[]> => {
  return ingredientRepo.find({
    where: { recipe: { uuid: recipeUuid } },
    order: { name: 'ASC' }, 
  });
};