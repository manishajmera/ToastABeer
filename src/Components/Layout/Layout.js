import React from 'react';
import Header from '../Header/Header';

export default function Layout(props) {
    return (
       <div className="container">
       <Header text="BeerLicious"/>
        {props.children}
       </div>
    )
}
