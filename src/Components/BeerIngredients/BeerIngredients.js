import React from "react";

export default function BeerIngredients({ ingredients }) {
  return (
    <div className="col col-sm-12">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Hops Name</th>
            <th scope="col">Value</th>
          </tr>
        </thead>
        <tbody>
            {ingredients.hops && ingredients.hops.length>0 && ingredients.hops.map((item,index)=><tr key={index}><td>{item.name}</td><td>{`${item.amount.value} ${item.amount.unit}`}</td></tr>)}
        </tbody>
      </table>
    </div>
  );
}
