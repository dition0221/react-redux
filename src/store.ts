import { configureStore, createAction, createReducer } from "@reduxjs/toolkit";

export interface IState {
  text: string;
  id: number;
}

// action
const addToDo = createAction<IState>("ADD");
const deleteToDo = createAction<IState>("DELETE");

const reducer = createReducer([], {
  [addToDo]: (state, action) => {
    state.push({ text: action.payload, id: Date.now() });
  },
  [deleteToDo]: (state, action) =>
    state.filter((toDo) => toDo.id !== action.payload),
});
const store = configureStore({ reducer });

export const actionCreators = {
  addToDo,
  deleteToDo,
};

export default store;
