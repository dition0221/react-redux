import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IToDo } from "../store";

export default function Detail() {
  // Check for matching 'params' & 'toDos.id'
  const { id } = useParams();
  const toDos = useSelector((state: IToDo[]) => state);
  const toDo = id && toDos.find((toDo) => toDo.id === parseInt(id));

  return <div>{JSON.stringify(toDo) ?? "Undefined"}</div>;
}
