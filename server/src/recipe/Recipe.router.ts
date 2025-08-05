import { Router, Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from 'axios';
import { createRecipe, getAllRecipes, getRecipeById, getRecipesByFoodRestriction, getRecipesByFoodType } from './Recipe.service';
import { BadRequestError, NotFoundError } from '../exceptions/httpErrors';
import { Recipe } from '@shared/types/recipe.type';

const router = Router();

router.post('/', async (req: Request<Recipe>, res: Response<Recipe>, next: NextFunction) => {
  try {
    const { name, workingTime, makingTime, difficultyLevel, kosher } = req.body;
    const recipeData = req.body;

    if (!name || !workingTime || !makingTime || !difficultyLevel || !kosher) {
      throw new BadRequestError('Missing required fields in recipe');
    }

    const newRecipe: Recipe = await createRecipe(recipeData);
    return res.status(HttpStatusCode.Created).json(newRecipe);
  } catch (error) {
    next(error);
  }
});

router.get('/:recipeUuid', async (req: Request, res: Response<Recipe>, next: NextFunction) => {
  const { recipeUuid } = req.params; 
  
  try {
    const recipe = await getRecipeById(recipeUuid);
    if (!recipe) {
      throw new NotFoundError('Recipe not found');
    }
    
    return res.json(recipe);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (_req: Request, res: Response<Recipe[]>, next: NextFunction) => {
  try {
    const recipes = await getAllRecipes();
    return res.json(recipes);
  } catch (error) {
    next(error);
  }
});

router.get('/type/:foodTypeUuid', async (req: Request, res: Response<Recipe[]>, next: NextFunction) => {
  const { foodTypeUuid } = req.params;

  try {
    const recipes = await getRecipesByFoodType(foodTypeUuid);
    return res.json(recipes);
  } catch (error) {
    next(error);
  }
});

router.get('/restriction/:foodRestrictionUuid', async (req: Request, res: Response<Recipe[]>, next: NextFunction) => {
  const { foodRestrictionUuid } = req.params;

  try {
    const recipes = await getRecipesByFoodRestriction(foodRestrictionUuid);
    return res.json(recipes);
  } catch (error) {
    next(error);
  }
});

export default router;
