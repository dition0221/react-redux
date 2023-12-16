import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { IToDo, addToDo } from "../store";
// Components
import ToDo from "../components/ToDo";

interface IForm {
  text: string;
}

export default function Home() {
  // Redux
  const toDos = useSelector((state: IToDo[]) => state);
  const dispatch = useDispatch();

  // <form>
  const { register, handleSubmit, reset } = useForm<IForm>();
  const onSubmit = ({ text }: IForm) => {
    dispatch(addToDo(text));
    reset();
  };

  return (
    <>
      <h1>To Do</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("text")} type="text" />
        <button>Add</button>
      </form>
      <ul>
        {toDos?.map((toDo) => (
          <ToDo {...toDo} key={toDo.id} />
        ))}
      </ul>
    </>
  );
}
