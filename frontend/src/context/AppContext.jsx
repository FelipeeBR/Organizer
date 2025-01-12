import { useContext, useReducer } from "react";
import { createContext } from "react";
import reducer from "../reducer";

const CLOSE_OPEN = 'CLOSE_OPEN';
const AppContext = createContext();

const initialState = {
    isSidebar: false,
    isModal: false,
    isModalDisciplina: false,
    isModalDisciplinaEdit: false,
    isModalTarefa: false,
    isModalTarefaEdit: false,
    editDisciplinaId: null,
    editTarefaId: null,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openClose = (element, id = null) => {
    dispatch({ type: CLOSE_OPEN, payload: { element, id } });
  };
  return (
    <AppContext.Provider
        value={{ ...state, openClose }}
    >
        {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

export const useContextApp = () => useContext(AppContext);