import express from 'express';
import cors from 'cors';
import { AppDataSource } from './data-source';
import foodTypeRoutes from './food-type/FoodType.router';
import foodRestrictionRoutes from './food-restriction/FoodRestriction.router'; 
import recipeRoutes from './recipe/Recipe.router';
import instructionRoutes from './instruction/Instruction.router'; 
import ingredientRoutes from './ingredient/Ingredient.router';
import errorHandler from './middlewares/errorHandler.middleware';

const app = express();
const PORT = 5000;

app.use(cors({
  origin: 'http://localhost:3000', // or '*' to allow all
  credentials: true
}));

app.get('/', (_req, res) => {
  res.send('Hello from Express + TypeScript!xxxx');
});

app.use(express.json());

app.use('/api/food-types', foodTypeRoutes);
app.use('/api/food-restrictions', foodRestrictionRoutes); 
app.use('/api/recipes', recipeRoutes);
app.use('/api/instructions', instructionRoutes);
app.use('/api/ingredients', ingredientRoutes);


app.use(errorHandler);

AppDataSource.initialize().then(() => {
  console.log('DB connected');
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
  