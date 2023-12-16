import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { IToDo, removeToDo } from "../store";

export default function ToDo({ text, id }: IToDo) {
  const dispatch = useDispatch();
  const onBtnClick = () => dispatch(removeToDo(id));

  return (
    <li>
      <Link to={`/${id}`}>{text}</Link>
      <button onClick={onBtnClick}>❌</button>
    </li>
  );
}
