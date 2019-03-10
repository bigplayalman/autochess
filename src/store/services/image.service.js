// region Action Types
const importAll = (r) => {
  let images = {};
  r.keys().forEach((item) => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
}
const images = importAll(require.context('../../assets', false, /\.(png|jpe?g|svg)$/))

// endregion

// region initialState
const initialState = {
  ...images
};
// endregion

// region Reducer
const reducer = (state = initialState, action = {}) => {

  switch (action.type) {
    default:
      return state;
  }
}
// endregion

// region Exports
const actionTypes = {
};

const actionCreators = {
};

export {
  actionTypes,
  actionCreators
};

export default reducer;
