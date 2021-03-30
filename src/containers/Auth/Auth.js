import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Btn from '../../components/UI/Button/Button';
import classes from './Auth.module.scss';
import * as actions from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elType: 'input',
                elConf: {
                    type: 'text',
                    placeholder: 'Your email'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 50
                },
                valid: false,
                touched: false
            },
            password: {
                elType: 'input',
                elConf: {
                    type: 'password',
                    placeholder: 'Your password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 25
                },
                valid: false,
                touched: false
            }
        },
        isSignUp: true
    }

    componentDidMount() {
        if (this.props.building && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath()
        }
    }

    checkValidity(value, rules) {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
        
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        return isValid;
    }

    switchAuthMode = () => {
        this.setState(preveState => {
            return {isSignUp: !preveState.isSignUp};
        })
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.controls,
            [inputIdentifier]: {
                ...this.state.controls[inputIdentifier],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[inputIdentifier]),
                touched: true
            }
        };
        this.setState({controls: updatedOrderForm})
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    render() {
        const formElArr = [];
        for (let key in this.state.controls) {
            formElArr.push({
                id: key,
                config: this.state.controls[key]
            });
        };

        let form;
        if (this.props.loading) {
            form = <Spinner />;
        } else {
            form = formElArr.map(el => (
                <Input 
                    elType={el.config.elType} 
                    elConf={el.config.elConf} 
                    type={el.config.elConf.type} 
                    placeholder={el.config.elConf.placeholder} 
                    key={el.id} 
                    changed={(event) => this.inputChangedHandler(event, el.id)} 
                    invalid={!el.config.valid} 
                    touched={el.config.touched} 
                    shouldValidate={el.config.validation} />
                
            ));
        };

        let errorMessage;
        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        };

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        };

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Btn btnType="Success">Submit</Btn>
                </form>
        <Btn 
            btnType="Danger"
            clicked={this.switchAuthMode}>{this.state.isSignUp ? 'Sign in' : 'Sign up'}</Btn>
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        building: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);