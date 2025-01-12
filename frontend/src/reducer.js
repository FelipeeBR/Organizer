const reducer = (state, action) => {
    switch (action.type) {
      case 'CLOSE_OPEN':
        return {
          ...state,
          [action.payload.element]: !state[action.payload.element],
          ...(action.payload.id !== undefined && { editDisciplinaId: action.payload.id }),
          ...(action.payload.id !== undefined && { editTarefaId: action.payload.id }),
        };
      default:
        return state;
    }
  };

export default reducer;