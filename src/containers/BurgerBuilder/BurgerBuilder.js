import React, { Component } from 'react';
import { connect } from 'react-redux'

import Aux from '../../hoc/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios.orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';


class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    }

    componentDidMount() {
        // axios.get('https://react-starter-ced1e.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients: response.data})
        //     })
        //     .catch(error => {
        //         this.setState({error: true})
        //     })


        // this.props.onInitIngredients();
    }

    // updatePurchaseState = (ingredients) => {
    //     const sum = Object.keys(ingredients)
    //         .map(el => {
    //             return ingredients[el]
    //         })
    //         .reduce((acc, el) => {
    //             return acc + el;
    //         }, 0);
    //     this.setState({ purchaseable: sum > 0 })
    // }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(el => {
                return ingredients[el]
            })
            .reduce((acc, el) => {
                return acc + el;
            }, 0);
        return sum > 0;
    }

    // addIngredientsHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;

    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     }
    //     updatedIngredients[type] = updatedCount;

    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;

    //     this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
    //     this.updatePurchaseState(updatedIngredients);
    // }
    
    // removeIngredientsHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if (oldCount <= 0) return;
    //     const updatedCount = oldCount - 1;

    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     }
    //     updatedIngredients[type] = updatedCount;

    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;

    //     this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    //     this.updatePurchaseState(updatedIngredients);
    // }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) this.setState({ purchasing: true })
        else {
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinue = () => {
        // const queryParams = [];
        // for (let i in this.state.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // };

        // queryParams.push('price=' + this.state.totalPrice);
        // const queryString = queryParams.join('&');
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString
        // });
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burger;

        if (this.props.ings !== null) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded} 
                        ingredientRemoved={this.props.onIngredientRemoved} 
                        disabled={disabledInfo} 
                        purchaseable={!this.updatePurchaseState(this.props.ings)} 
                        price={this.props.price} 
                        ordered={this.purchaseHandler} 
                        isAuth={this.props.isAuthenticated}/>
                </Aux>
            );
            orderSummary = <OrderSummary 
                ingredients={this.props.ings} 
                purchaseCanceled={this.purchaseCancelHandler} 
                purchaseContinued={this.purchaseContinue} 
                price={this.props.price} />;
        } else {
            burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />
        }

        return (
            <Aux>
                <Modal 
                    show={this.state.purchasing} 
                    modalClosed={this.purchaseCancelHandler} >
                        {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));