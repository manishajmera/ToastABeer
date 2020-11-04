import React from 'react';
import "./ComplementFood.css";

export default function ComplementFood({complementFood}) {
    return (
        <div className="col col-sm-12 complementFood">
        <h4 className="subHeading">Complementing Food Items</h4>
        <ul className="list">
        {complementFood && complementFood.length>0 && complementFood.map((item,index)=><li key={index}>{`${item}   `}</li>)}
        </ul>
    </div>
    )
}
