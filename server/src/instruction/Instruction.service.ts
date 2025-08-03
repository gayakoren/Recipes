import { AppDataSource } from '../data-source';
import { Instruction } from './Instruction.entity';

const instructionRepo = AppDataSource.getRepository(Instruction);

export const createInstruction = (instructionData: Instruction): Promise<Instruction> => {
  const newInstruction = instructionRepo.create(instructionData);
  return instructionRepo.save(newInstruction);
};

export const getInstructionsByRecipeId = (recipeUuid: string): Promise<Instruction[]> => {
  return instructionRepo.find({
    where: { recipe: { uuid: recipeUuid } },
    order: { step: 'ASC' },
  });
};