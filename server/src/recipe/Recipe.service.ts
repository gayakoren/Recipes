import { AppDataSource } from '../data-source';
import { Recipe } from './Recipe.entity';

const recipeRepo = AppDataSource.getRepository(Recipe);

export const createRecipe = async (recipeData: Partial<Recipe>): Promise<Recipe> => {
  const  {
    foodTypes: foodTypeIds = [],
    foodRestrictions: foodRestrictionIds = [],
    ingredients = [],
    instructions = [],
    ...rest
  } = recipeData;

  return await recipeRepo.save(recipeData);
};

export const getRecipeById = (recipeUuid: string): Promise<Recipe | null> => {
  return recipeRepo.findOne({
    where: { uuid: recipeUuid },
    relations: ['foodTypes', 'foodRestrictions', 'ingredients', 'instructions'],
  });
};

export const getAllRecipes = (): Promise<Recipe[]> => {
  return recipeRepo.find({
    relations: ['foodTypes', 'foodRestrictions', 'ingredients', 'instructions'],
    order: { name: 'ASC' },
  });
};

export const getRecipesByFoodType = (foodTypeUuid: string): Promise<Recipe[]> => {
  return recipeRepo.find({
    where: { foodTypes: { uuid: foodTypeUuid } },
    relations: ['foodTypes', 'foodRestrictions', 'ingredients', 'instructions'],
    order: { name: 'ASC' },
  });
};

export const getRecipesByFoodRestriction = (foodRestrictionUuid: string): Promise<Recipe[]> => {
  return recipeRepo.find({
    where: { foodRestrictions: { uuid: foodRestrictionUuid } },
    relations: ['foodTypes', 'foodRestrictions', 'ingredients', 'instructions'],
    order: { name: 'ASC' },
  });
};




