import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";

type Text = string;
type Id = number;

export interface IToDo {
  text: Text;
  id: Id;
}

/*
const addToDo = createAction<Text>("ADD");
const deleteToDo = createAction<Id>("DELETE");

export const actionCreators = {
  addToDo,
  deleteToDo,
};

const reducer = createReducer([] as IState[], (builder) => {
  builder
    .addCase(addToDo, (state, action) => {
      state.push({ text: action.payload, id: Date.now() });
    })
    .addCase(deleteToDo, (state, action) =>
      state.filter((toDo) => toDo.id !== action.payload)
    );
});
*/

const toDos = createSlice({
  name: "toDos",
  initialState: [{ text: "Test", id: 1 }] as IToDo[],
  reducers: {
    addToDo: (state, action: PayloadAction<Text>) => {
      state.push({ text: action.payload, id: Date.now() });
    },
    removeToDo: (state, action: PayloadAction<Id>) =>
      state.filter((toDo) => toDo.id !== action.payload),
  },
});
export const { addToDo, removeToDo } = toDos.actions;

const store = configureStore({ reducer: toDos.reducer });

export default store;
