import React, {useContext } from "react";
import { RecipeContext } from "../contexts/RecipeContext";

const Header = () => {
  const { recipes } = useContext(RecipeContext);
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          { recipes?.length > 0 && (recipes?.length > 1 ? <h2>I've cooked {recipes?.length} things!</h2> : <h2>I've cooked {recipes?.length} thing!</h2>)}
          {(recipes?.length <= 0 || !recipes) && (
            <h2>Take the hassle out of recipe management...</h2>
          )}
        </div>
      </div>
      <div className="row header">
        <div className="col">
          <p>
            Having trouble keeping track of all the food you're cooking?
            Look no further than Home Cooking! Add your recipes here to view at any time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
