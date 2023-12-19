import {
  PayloadAction,
  combineReducers,
  configureStore,
  createSlice,
} from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

type Text = string;
type Id = number;

export interface IToDo {
  text: Text;
  id: Id;
}

export interface IRootState {
  toDos: IToDo[];
  isDarkTheme: boolean;
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

const toDosSlice = createSlice({
  name: "toDos",
  initialState: [{ text: "by dition0221", id: 1 }] as IToDo[],
  reducers: {
    addToDo: (state, action: PayloadAction<Text>) => {
      state.push({ text: action.payload, id: Date.now() });
    },
    removeToDo: (state, action: PayloadAction<Id>) =>
      state.filter((toDo) => toDo.id !== action.payload),
  },
});
export const { addToDo, removeToDo } = toDosSlice.actions;

const isDarkThemeSlice = createSlice({
  name: "isDarkTheme",
  initialState: false as boolean, // lightTheme
  reducers: {
    toggleTheme: (state) => !state,
  },
});
export const { toggleTheme } = isDarkThemeSlice.actions;

// Persist store
const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  toDos: toDosSlice.reducer,
  isDarkTheme: isDarkThemeSlice.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistedStore = persistStore(store);
