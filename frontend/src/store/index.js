import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import authReducer from '../features/authSlice';
import disciplinaReducer from '../features/disciplinaSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    disciplina: disciplinaReducer,
  },
});

export default store;
