import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { createLogger } from "redux-logger";
import heroReducer from "./services/hero.service";
import imageReducer from "./services/image.service";
import synergyReducer from "./services/synergy.service";

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
    heroes: heroReducer,
    images: imageReducer,
    synergies: synergyReducer
   });
};

export const configureStore = () => {
  return {
    store: createStore(createRootReducer(history), composeEnhancers(applyMiddleware(...middlewares))),
    history,
  };
}
