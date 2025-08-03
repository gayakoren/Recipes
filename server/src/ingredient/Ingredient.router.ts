import { Router, Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from 'axios';
import { createIngredient, getIngredientsByRecipeId } from './Ingredient.service';
import { BadRequestError, NotFoundError } from '../exceptions/httpErrors';
import { Ingredient } from '@shared/types/ingredient.type'

const router = Router();

router.post('/', 
    async (req: Request<Ingredient>, res: Response<Ingredient>, next: NextFunction) => {
    const ingredientData = req.body;

    if (!ingredientData.recipe || !ingredientData.name || !ingredientData.amount || !ingredientData.unit) {
        throw new BadRequestError('Recipe, name amount and unit are required')
    }
    try {
        const newIngredient = await createIngredient(ingredientData);
        return res.status(HttpStatusCode.Created).json(newIngredient);
    } catch (error) {
        next(error);
    }
});

router.get('/:recipeUuid', 
    async (req: Request, res: Response<Ingredient[]>, next: NextFunction) => {
    const { recipeUuid } = req.params;
    
    try {
        const ingredients = await getIngredientsByRecipeId(recipeUuid);
        if (!ingredients || ingredients.length === 0) {
            throw new NotFoundError('No ingredients found for this recipe');
        }
        return res.json(ingredients);
    } catch (error) {
        next(error);
    }
});

export default router;