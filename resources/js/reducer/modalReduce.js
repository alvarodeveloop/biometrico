const initialState = {
  isOpen: false,
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case 'toggle':
      return {
        isOpen: !state.isOpen
      };
    break;
    default: return state;
  }
}
