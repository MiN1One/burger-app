import React from 'react';
import ReactDOM from 'react-dom';
import './index.module.scss';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import reduxThunk from 'redux-thunk';

import burgerBuilderReducer from './store/reducers/reducerBurgerBuilder';
import orderReducer from './store/reducers/reducerOrder';
import authReducer from './store/reducers/reducerAuth';

// const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer
});

const store = createStore(rootReducer, compose(applyMiddleware(reduxThunk)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
