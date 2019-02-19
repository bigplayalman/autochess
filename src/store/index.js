import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory, History } from 'history';
import { createLogger } from 'redux-logger';
import heroReducer from './services/hero.services';

const logger= createLogger({
  collapsed: (getState, action) => {
    return ((action && action.expandInLog)
      ? false
      : true);
  },
  level: 'info',
});

const composeEnhancers = (window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [thunk];
const history = createBrowserHistory({});

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const createRootReducer = (history) => {
  return combineReducers({
    history,
    heroes: heroReducer
   });
};

export const configureStore = () => {
  return {
    store: createStore(createRootReducer(history), composeEnhancers(applyMiddleware(...middlewares))),
    history,
  };
}
