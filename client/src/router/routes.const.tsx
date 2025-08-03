import { Navigate } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import RecipeDetailsPage from "../pages/recipeDetails/RecipeDetailsPage";
import RecipesPage from "../pages/recipes/RecipesPage";

export const BASE_PATH = "/recipes";
export const HOME_BASE_PATH = `${BASE_PATH}/home`;

export const appRoutes = [
  { path: HOME_BASE_PATH, element: <HomePage /> },
  { path: BASE_PATH, element: <RecipesPage /> },
  { path: `${BASE_PATH}/:id`, element: <RecipeDetailsPage /> },
  { path: `${BASE_PATH}/*`, element: <Navigate to={HOME_BASE_PATH} replace /> },
  { path: "/", element: <Navigate to={HOME_BASE_PATH} replace /> },
];

//         <Route path="*" element={<h2>404 - דף לא נמצא</h2>} />
