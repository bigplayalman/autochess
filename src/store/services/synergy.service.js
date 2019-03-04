import {
  synergies
} from '../data/synergies';
// region Action Types
const SET_SYNERGY = 'synergy/SET'
// endregion

// region initialState
const initialState = {
  actives: {},
  synergies
};
// endregion

// region Reducer
const reducer = (state = initialState, action = {}) => {

  switch (action.type) {
    case SET_SYNERGY:
      return {
        ...state,
        ...action.res
      }
    default:
      return state;
  }
}
// endregion

// region Actions
const setSynergy = (prop) => {
  return {type:SET_SYNERGY, res:prop}
}
// endregion

// region Action Creators
const activateSynergies = (synergies, actives) => {
  Object.keys(actives).map(active => {
    if (actives[active] < 1) {
      synergies[active].active = false;
    } else {
      if (active === 'demon' && actives['demon'] >= 2) {
        synergies[active].active = actives['demonhunter'] && actives['demonhunter'] >= 2;
      } else {
        synergies[active].active = true;
      }
    }
    return active;
  });
  return synergies;
}

const addSynergies = (actives) => {
  return (dispatch, getState) => {
    const state = {...getState().synergies};
    actives.map(active => {
      if(state.actives[active]) {
        state.actives[active]++;
      } else {
        state.actives[active] = 1;
      }
      return active;
    });
    state.synergies = activateSynergies(state.synergies, state.actives);
    dispatch(setSynergy(state));
  }
}

const removeSynergies = (actives) => {
  return (dispatch, getState) => {
    const state = {...getState().synergies};
    actives.map(active => {
      state.actives[active]--;
      return active;
    });
    state.synergies = activateSynergies(state.synergies, state.actives);
    dispatch(setSynergy(state));
  }
}

// region Exports
const actionTypes = {
};

const actionCreators = {
  addSynergies,
  removeSynergies
};

export {
  actionTypes,
  actionCreators
};

export default reducer;
