import React, { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
export const RecipeContext = createContext();

const RecipeContextProvider = (props) => {
  const [recipes, setRecipes] = useState(
    JSON.parse(localStorage.getItem("recipes")),
    []
  );

  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  const addRecipe = (date, description, title, steps) => {
    if (!recipes) {
      setRecipes([{ date, description, title, steps, id: uuidv4() }]);
      return;
    }
    setRecipes(
      _.orderBy(
        [...recipes, { date, description, title, steps, id: uuidv4() }],
        ["date"],
        ["desc"]
      )
    );
  };

 
  const removeRecipe = (id) => {
    setRecipes(recipes?.filter((recipe) => recipe.id !== id));
  };

  const editRecipe = (id, newText, newTitle, newSteps, newDate) => {
    let newRecipes = recipes;

    for (let i = 0; i < recipes.length; i++) {
      if (recipes[i].id === id) {
        newRecipes[i].description = newText;
        newRecipes[i].title = newTitle;
        newRecipes[i].steps = newSteps;
        newRecipes[i].date = newDate;
        setRecipes(newRecipes);
        localStorage.setItem("recipes", JSON.stringify(newRecipes));
      }
    }
  };

  return (
    <RecipeContext.Provider
      value={{ recipes, addRecipe, removeRecipe, editRecipe }}
    >
      {props.children}
    </RecipeContext.Provider>
  );
};
export default RecipeContextProvider;

//Provider: provides values and passing everything down
