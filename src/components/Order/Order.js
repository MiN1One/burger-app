import React from 'react';
import { string } from 'prop-types';

import classes from './Order.module.scss';

const Order = (props) => {
    const ingredients = [];

    for (let ingr in props.ingredients) {
        ingredients.push(
            {
                name: ingr,
                amount: props.ingredients[ingr]
            }
        )
    }

    const ingredientOutput = ingredients.map(el => {
        return <span 
            key={el.name} 
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}>{el.name} ({el.amount})</span>;
    })

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    )
};

export default Order;