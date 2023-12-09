import { createStore } from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");
let count = 0;

const updateText = () => (number.innerText = String(count));
updateText();

add.addEventListener("click", () => {
  count++;
  updateText();
});
minus.addEventListener("click", () => {
  count--;
  updateText();
});
