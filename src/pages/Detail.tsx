import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { IRootState, removeToDo } from "../store";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";

const ToDoContainer = styled.main``;

const Li = styled.li`
  font-size: 19px;
  margin-bottom: 15px;
  button {
    font-size: inherit;
    border: 0;
    border-radius: 5px;
    padding: 2px 7px;
    background-color: ${(props) => props.theme.textColor};
    color: ${(props) => props.theme.bgColor};
    cursor: pointer;
  }
`;

export default function Detail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Check for matching 'params' & 'toDos.id'
  const { id } = useParams();
  const toDos = useSelector((state: IRootState) => state.toDos);
  const toDo = toDos.find((toDo) => toDo.id === parseInt(id + ""));

  // Date
  const date = toDo?.id ? new Date(toDo.id) : null;

  // Delete button
  const deleteToDo = () => {
    if (!toDo) return alert("Error: ToDo is not existed.");
    dispatch(removeToDo(toDo.id));
    navigate("/");
  };

  return (
    <>
      <Helmet>
        <title>{`${toDo?.text ?? "Undefined"} | dition0221`}</title>
      </Helmet>

      {toDo && (
        <ToDoContainer>
          <ul>
            <Li>🔶 {toDo?.text}</Li>
            <Li>🔶 {date && date.toLocaleString()}</Li>
            <Li>
              <button onClick={deleteToDo}>❌ 삭제하기</button>
            </Li>
          </ul>
        </ToDoContainer>
      )}
    </>
  );
}
