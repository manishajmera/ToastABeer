import React, { useState } from "react";
import "./FilterComponent.css";

export default function FilterComponent({
  foodFilterList,
  setFoodFilterList,
  handleIngredientFilter,
}) {
  const [userFilter, setUserFilter] = useState("");
  const handleRemoveFilter = (e, userFilter) => {
    let userFilters = foodFilterList;
    const index = userFilters.indexOf(userFilter);
    if (index > -1) {
      userFilters.splice(index, 1);
    }
    setFoodFilterList(userFilters);
  };
  const handleKeyDown = (e) => {
    if (e.which === 13) {
      let userFilters = foodFilterList;
      userFilters.push(userFilter);
      setUserFilter("");
      setFoodFilterList(userFilters);
    }
  };
  return (
    <div className="row filter">
      <div className="col col-sm-7 filter-by-ingredient">
        <span>Filter By Ingredient:-</span>
        <input
          type="text"
          id="ingredientName"
          className="form-control"
          placeholder="Ingredient name"
        />
        <input
          type="number"
          id="ingredientValue"
          className="form-control"
          min="0"
          max="50"
          step="0.1"
          placeholder="Amount"
        />
        <div className="submit-btn">  
          <input type="button" value="Submit" onClick= {(e) => handleIngredientFilter(e)}/>  
        </div> 
        {/* <button onClick={(e) => handleIngredientFilter(e)}>Submit</button> */}
      </div>
      <div className="col col-sm-4 food-filters">
        <span>Filter By Foods:- </span>
        {foodFilterList.map((item, index) => (
          <span key={index}>
            {item}
            <span
              className="close"
              onClick={(e) => handleRemoveFilter(e, item)}
            >
              x
            </span>
          </span>
        ))}
        <input
          type="text"
          className="form-control"
          placeholder="Enter Food Names"
          onChange={(e) => setUserFilter(e.target.value)}
          value={userFilter}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}
