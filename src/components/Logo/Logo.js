import React from 'react';

import burgerLogo from '../../assets/images/28.1 burger-logo.png.png';
import classes from './Logo.module.scss';

const Logo = (props) => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="MyBurger" />
    </div>
)

export default Logo;