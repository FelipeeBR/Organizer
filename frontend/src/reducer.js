const reducer = (state, action) => {
    switch (action.type) {
      case 'CLOSE_OPEN':
        const { element } = action.payload;
        return { ...state, [element]: !state[element] };
      default:
        return state;
    }
  };

export default reducer;