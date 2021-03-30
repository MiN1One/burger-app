import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
 
// import classes from './Checkout.module.scss';
import Summary from '../../components/Order/Summary/Summary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    // state = {
    //     ingredients: null,
    //     totalPrice: 0
    // }

    // Does the stuff before component gets mounted 
    // componentWillMount() {
    //     const query = new URLSearchParams(this.props.location.search);
    //     console.log(query);
    //     let ingredients = {};
    //     let price = 0;
    //     for (let param of query.entries()) {
    //         if (param[0] === 'price') {
    //             price = param[1];
    //         } else {
    //             ingredients[param[0]] = +param[1];
    //         }
    //         console.log(param[0])
    //     }
    //     this.setState({ingredients: ingredients, totalPrice: price});
    //     console.log(this.state)
    // }

    // componentWillMount() {
    //     this.props.onInitPurchase();
    // }

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }
    
    checkoutContinueHandler = () => {
        this.props.history.replace('checkout/contact-data');
    }

    render() {
        let summary = <Redirect to="/" />;
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary = <React.Fragment>
                            {purchasedRedirect}
                            <Summary 
                            ingredients={this.props.ings} 
                            onCheckCanceled={this.checkoutCancelHandler} 
                            onCheckContinued={this.checkoutContinueHandler} />
                            <Route 
                                path={this.props.match.path + '/contact-data'} 
                                component={ContactData} />
                        </React.Fragment>;
        }
        return (
            <div>
                {summary}
                {/* <Route 
                    path={this.props.match.path + '/contact-data'} 
                    render={(props) => (<ContactData ingredients={this.state.ingredients} {...props}/>)} /> */}
                {/* <ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} /> */}
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
};

// const mapDispatchToProps = dispatch => {
//     return {
//         onInitPurchase: () => dispatch(actions.purchaseInit)
//     }
// }

export default connect(mapStateToProps)(Checkout);