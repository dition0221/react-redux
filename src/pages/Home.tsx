import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { IAction, IState, actionCreators } from "../store";
import { Dispatch } from "redux";
import ToDo from "../components/ToDo";
import { Link } from "react-router-dom";

interface IHomeProps {
  toDos: IState[];
  addToDo: (text: string) => IAction;
}

interface IForm {
  text: string;
}

function Home({ toDos, addToDo }: IHomeProps) {
  // <form>
  const { register, handleSubmit, reset } = useForm<IForm>();
  const onSubmit = ({ text }: IForm) => {
    addToDo(text);
    reset();
  };

  return (
    <>
      <h1>To Do</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("text")} type="text" />
        <button>Add</button>
      </form>
      <Link to="/1">go 1</Link>
      <ul>
        {toDos.map((toDo) => (
          <ToDo {...toDo} key={toDo.id} />
        ))}
      </ul>
    </>
  );
}

function mapStateToProps(state: IState[]) {
  return { toDos: state };
}

function mapDispatchToProps(dispatch: Dispatch<IAction>) {
  return {
    addToDo: (text: string) => dispatch(actionCreators.addToDo(text)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
