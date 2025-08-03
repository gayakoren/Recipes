import { Router, Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from 'axios';
import { createFoodType, getFoodTypeById, getFoodTypes } from './FoodType.service';
import { BadRequestError, NotFoundError } from '../exceptions/httpErrors';
import { FoodType } from '@shared/types/foodType.type'

const router = Router();

router.post('/', 
    async (req: Request<FoodType>, res: Response<FoodType>, next: NextFunction) => {
    const { type } = req.body;

    if (!type) {
        throw new BadRequestError('Type is required');
    }
    try {
        const newFoodType = await createFoodType(type);
        return res.status(HttpStatusCode.Created).json(newFoodType);
    } catch (error) {
        next(error);}
    }
);

router.get('/', 
    async (_req: Request, res: Response<FoodType[]>, next: NextFunction) => {
    try {
        return res.json(await getFoodTypes());
    } catch (error) {
        next(error);
    }
});

router.get('/:id', 
    async (req: Request, res: Response<FoodType>, next: NextFunction) => {
    const { id } = req.params;
    try {
        const foodType = await getFoodTypeById(id);

        console.log(foodType);

        if (!foodType) {
            throw new NotFoundError('Food type not found');
        }
        return res.json(foodType);
    } catch (error) {
        next(error);
    }
});


export default router;
