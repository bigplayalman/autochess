import {
  synergies
} from '../data/synergies';
// region Action Types
const SET_SYNERGY = 'synergy/SET'
// endregion

// region initialState
const initialState = {
  synergies
};
// endregion

// region Reducer
const reducer = (state = initialState, action = {}) => {

  switch (action.type) {
    case SET_SYNERGY:
      return {
        ...state,
        synergies: {
          ...action.res,
        }
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
const updateSynergies = (list) => {
  return (dispatch, getState) => {
    const synergies = {...getState().synergies};
    Object.keys(list).map(item => {
      Object.keys(synergies[item]).map(synergy => {
        synergies[item].active = parseInt(synergy) >= list[item];
        return synergy;
      });
      return item;
    })
    dispatch(setSynergy(synergies))
  }
}

// const conditionalSynergies = (synergies, heroes) => {
//   const demonhunters = synergies.filter(x => x.type === 'demonhunter');
//   const demons = heroes.filter(y => y.demon === true);
//   if (demonhunters.length < 2 && demons.length > 1) {
//     return synergies.filter(y => y.type !== 'demon');
//   }
//   return synergies;
// }

// const getActiveSynergies = (actives) => {
//   const activeSynergies = [];
//   synergies.map(synergy => {
//     if (actives[synergy.type] && actives[synergy.type] >= synergy.count) {
//       activeSynergies.push(synergy);
//     }
//     return synergy;
//   })
//   return activeSynergies;
// }
// endregion

// region Exports
const actionTypes = {
};

const actionCreators = {
  updateSynergies
};

export {
  actionTypes,
  actionCreators
};

export default reducer;
