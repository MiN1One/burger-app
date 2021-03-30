import React from 'react';

import classes from './BuildControls.module.scss';
import BuildControl from './BuildControl/BuildControl';

const CONTROLS = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

const BuildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {CONTROLS.map(el => (
            <BuildControl 
                key={el.label} 
                label={el.label} 
                added={props.ingredientAdded.bind(this, el.type)} 
                removed={props.ingredientRemoved.bind(this, el.type)} 
                disabled={props.disabled[el.type]} />
        ))}
        <button 
            className={classes.OrderButton} 
            disabled={props.purchaseable} 
            onClick={props.ordered}>{props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
    </div>
);

export default BuildControls;
