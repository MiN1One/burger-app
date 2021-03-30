import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './Summary.module.scss'

const Summary = (props) => {
    return (
        <div className={classes.Summary}>
            <h1>We hope it tastes well!</h1>
            <div stye={{width: '100%', height: '300px', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button 
                btnType="Danger" 
                clicked={props.onCheckCanceled}>CANCEL</Button>
            <Button 
                btnType="Success" 
                clicked={props.onCheckContinued}>CONTINUE</Button>
        </div>
    );
}

export default Summary;