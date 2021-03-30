import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import asyncComponent from '../hoc/asyncComponent/asyncComponent';

import Layout from '../components/Layout/Layout';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
// import Checkout from './Checkout/Checkout';
// import Orders from '../containers/Orders/Orders';
// import Auth from '../containers/Auth/Auth';
import Logout from '../containers/Auth/Logout/Logout';
import * as actions from '../store/actions';

const asyncCheckout = asyncComponent(() => {
    return import('./Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
    return import('../containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
    return import('../containers/Auth/Auth');
});

class App extends Component {
    componentDidMount () {
        this.props.onTryAutoSignUp();
    }

    render() {
        let routes = (
            <Switch>
                <Route path="/auth" component={asyncAuth} />
                <Route path="/" exact component={BurgerBuilder} />
                <Redirect to="/" />
            </Switch>
        );

        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/checkout" component={asyncCheckout} />
                    <Route path="/orders" component={asyncOrders} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/" exact component={BurgerBuilder} />
                    <Redirect to="/" />
                </Switch>
            );
        }

        return (
            // <BrowserRouter>
                <div>
                    <Layout>
                        {routes}
                    </Layout>
                </div>
            // </BrowserRouter>
        );
    }
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignUp: () => dispatch(actions.authCheckState())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
