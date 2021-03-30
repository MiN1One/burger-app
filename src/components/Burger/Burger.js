import React from 'react';
import { withRouter } from 'react-router-dom';

import classes from './Burger.module.scss';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
    let tIngredients = Object.keys(props.ingredients).map(
        el => {
            return [...Array(props.ingredients[el])].map((_, i) => {
                return <BurgerIngredient key={el + i} type={el} />
            });
        })
        .reduce((acc, el) => {
            return acc.concat(el)
        }, []);
        
    if (tIngredients.length == 0) {
        tIngredients = <p>Please start adding ingredients</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {tIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default withRouter(Burger);