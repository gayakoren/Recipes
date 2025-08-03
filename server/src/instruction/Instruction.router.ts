import { Router, Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from 'axios';
import { createInstruction, getInstructionsByRecipeId } from './Instruction.service';
import { BadRequestError, NotFoundError } from '../exceptions/httpErrors';
import { Instruction } from '@shared/types/instruction.type'

const router = Router();

router.post('/', 
    async (req: Request<Instruction>, res: Response<Instruction>, next: NextFunction) => {
    const instructionData = req.body;

    if ( !instructionData.recipe || !instructionData.step || !instructionData.description) {
        throw new BadRequestError('Recipe, step and description are required');
    }
    try {
        const newInstruction = await createInstruction(instructionData);
        return res.status(HttpStatusCode.Created).json(newInstruction);
    } catch (error) {
        next(error);
    }
});

router.get('/:recipeUuid', 
    async (req: Request, res: Response<Instruction[]>, next: NextFunction) => {
    const { recipeUuid } = req.params;
    
    try {
        const instructions = await getInstructionsByRecipeId(recipeUuid);
        if (!instructions || instructions.length === 0) {
            throw new NotFoundError('No instructions found for this recipe');
        }
        return res.json(instructions);
    } catch (error) {
        next(error);
    }
});

export default router;