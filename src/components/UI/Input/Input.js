import React from 'react';

import classes from './Input.module.scss';

const Input = props => {
    let inputEl = null;
    const inputClasses = [classes.InputEl];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch (props.elType) {
        case ('input'):
            inputEl = <input 
                className={inputClasses.join(' ')} 
                {...props.elConf} 
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('textarea'):
            inputEl = <textarea 
                className={classes.Label} 
                {...props.elConf} 
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('select'):
            inputEl = (
                <select
                className={inputClasses.join(' ')} 
                value={props.value}
                onChange={props.changed}>
                    {props.elConf.options.map(el => (
                        <option key={el.value} value={el.value}>{el.displayVal}</option>
                    ))}
                </select>
            );
            break;
        default:
            inputEl = <input 
                className={inputClasses.join(' ')} 
                {...props.elConf} 
                value={props.value} />;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputEl}
        </div>
    )
};

export default Input;