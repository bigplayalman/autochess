import {
  heroes
} from '../../heroes';
// region Action Types
const SET_HERO = 'hero/SET';


// endregion

// region initialState
const initialState = {
  heroes
};
// endregion

// region Reducer
const reducer = (state = initialState, action = {}) => {

  switch (action.type) {
    case SET_HERO:
      const key = Object.keys(action.res)[0];
      return {
        ...state,
        [key]: {
          ...action.res
        }
      }
    default:
      return state;
  }
}
// endregion

// region Actions
const setData = (prop) => {
  return {
    type: SET_DATA,
    res: prop
  };
}
// endregion

// region Action Creators

const setHero = (hero) => {
  return (dispatch) => {
    dispatch(setData(hero));
  }
}

// endregion

// region Exports
const actionTypes = {
  SET_DATA,
};

const actionCreators = {
  setHero
};

export {
  actionTypes,
  actionCreators
};

export default reducer;
