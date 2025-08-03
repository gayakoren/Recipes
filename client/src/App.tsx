import React from 'react';
import './App.css';
import Navbar from './components/navber/Navbar';
import RecipesPage from './pages/recipes/RecipesPage';
import RecipeDetailsPage from './pages/recipeDetails/RecipeDetailsPage';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router/AppRouter';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      
      
      </header> */}
       {/* <Navbar />
       <RecipesPage/>
       <RecipeDetailsPage/> */}

        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>


    </div>
  );
}

export default App;
