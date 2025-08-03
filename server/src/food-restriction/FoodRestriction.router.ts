import { Router, Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from 'axios';
import { createFoodRestriction, getFoodRestrictionById, getFoodRestrictions } from './FoodRestriction.service';
import { BadRequestError, NotFoundError } from '../exceptions/httpErrors';
import { FoodRestriction } from '@shared/types/foodRestriction.type'

const router = Router();

router.post('/', 
    async (req: Request<FoodRestriction>, res: Response<FoodRestriction>, next: NextFunction) => {
    const { restriction } = req.body;

    if (!restriction) {
        throw new BadRequestError('Restriction is required');
    }
    try {
        const newFoodRestriction = await createFoodRestriction(restriction);
        return res.status(HttpStatusCode.Created).json(newFoodRestriction);
    } catch (error) {
        next(error);
    }
    }
);

router.get('/', 
    async (_req: Request, res: Response<FoodRestriction[]>, next: NextFunction) => {
    try {
        return res.json(await getFoodRestrictions());
    } catch (error) {
        next(error);
    }
});

router.get('/:id', 
    async (req: Request, res: Response<FoodRestriction>, next: NextFunction) => {
    const { id } = req.params;
    try {
        const foodRestriction = await getFoodRestrictionById(id);
        if (!foodRestriction) {
            throw new NotFoundError('Food restriction not found');
        }
        return res.json(foodRestriction);
    } catch (error) {
        next(error);}
});

export default router;
