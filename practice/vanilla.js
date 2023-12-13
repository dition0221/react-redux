import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

// Create "action" shape
const addTodo = (text) => ({ type: ADD_TODO, text });
const deleteTodo = (id) => ({ type: DELETE_TODO, id });

// store
const reducer = (state = [], { type, text, id }) => {
  switch (type) {
    case ADD_TODO:
      return [{ text, id: Date.now() }, ...state];
    case DELETE_TODO:
      return state.filter((toDo) => toDo.id !== id);
    default:
      return state;
  }
};
const store = createStore(reducer);

// fn. of "action"
const dispatchAddToDo = (text) => store.dispatch(addTodo(text));
const dispatchDeleteToDo = (e) => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteTodo(id));
};

// Paint to-do list on screen
const paintToDos = () => {
  const toDos = store.getState();
  ul.innerHTML = "";
  toDos.forEach((toDo) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "❌";
    btn.addEventListener("click", dispatchDeleteToDo);
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
};
store.subscribe(paintToDos);

// Add to-do
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchAddToDo(toDo);
});
