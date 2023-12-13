import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IAction, IState, actionCreators } from "../store";
import { Link } from "react-router-dom";

interface IToDoProps {
  text: string;
  id: number;
  onBtnClick: () => IAction;
}

function ToDo({ text, id, onBtnClick }: IToDoProps) {
  return (
    <li>
      <Link to={`/${id}`}>{text}</Link>
      <button onClick={onBtnClick}>❌</button>
    </li>
  );
}

function mapDispatchToProps(dispatch: Dispatch<IAction>, ownProps: IState) {
  return {
    onBtnClick: () => dispatch(actionCreators.deleteToDo(ownProps.id)),
  };
}

export default connect(null, mapDispatchToProps)(ToDo);
