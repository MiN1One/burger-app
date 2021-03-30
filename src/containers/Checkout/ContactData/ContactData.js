import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.scss';
import axios from '../../../axios.orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elType: 'input',
                elConf: {
                    type: 'text',
                    placeholder: 'Your email'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 25
                },
                valid: false,
                touched: false
            },
            street: {
                elType: 'input',
                elConf: {
                    type: 'text',
                    placeholder: 'Your street address'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 25
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elType: 'input',
                elConf: {
                    type: 'number',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 25
                },
                valid: false,
                touched: false
            },
            country: {
                elType: 'input',
                elConf: {
                    type: 'text',
                    placeholder: 'Your country'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 25
                },
                valid: false,
                touched: false
            },
            email: {
                elType: 'input',
                elConf: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 25
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elType: 'select',
                elConf: {
                    options: [
                        {value: 'fastest', displayVal: 'Fastest'}, 
                        {value: 'cheapest', displayVal: 'Econom'}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true,
            }
        },
        formIsValid: false
    }

    orderhandler = (event) => {
        event.preventDefault();
        // this.setState({loading: true});

        const formData = {};
        for (let formElIdent in this.state.orderForm) {
            formData[formElIdent] = this.state.orderForm[formElIdent].value;
        }

        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        };

        this.props.onOrderBurger(order, this.props.token);
        // axios.post('/orders.json', order)
        //     .then(order => {
        //         this.setState({loading: false});
        //         this.props.history.push('/')
        //     })
        //     .catch(error => {
        //         this.setState({loading: false})    
        //     });
    }

    // trim() method removes white spaces

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

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };

        const updatedFormEl = {
            ...updatedOrderForm[inputIdentifier]
        };

        updatedFormEl.value = event.target.value;
        updatedFormEl.valid = this.checkValidity(updatedFormEl.value, updatedFormEl.validation);
        updatedFormEl.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormEl;

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
        }

        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    render() {
        const formElArr = [];
        for (let key in this.state.orderForm) {
            formElArr.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderhandler}>
                {/* <Input elType="..." elConfig="..." value="..."/> */}
                {formElArr.map(el => (
                    <Input 
                        elType={el.config.elType} 
                        elConf={el.config.elConf} 
                        type={el.config.elConf.type} 
                        // value={el.config.elConf.placeholder} 
                        placeholder={el.config.elConf.placeholder} 
                        key={el.id} 
                        changed={(event) => this.inputChangedHandler(event, el.id)} 
                        invalid={!el.config.valid} 
                        touched={el.config.touched} 
                        shouldValidate={el.config.validation} />
                ))}
                <Button 
                    btnType="Success" 
                    clicked={this.orderhandler} 
                    disabled={!this.state.formIsValid}>Order</Button>
            </form>
        );

        if (this.props.loading) {
            form = <Spinner />;
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const maptDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    };
};

export default connect(mapStateToProps, maptDispatchToProps)(withErrorHandler(ContactData, axios));