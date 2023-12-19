import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { IToDo, removeToDo } from "../store";
import styled from "styled-components";

const Wrapper = styled.li`
  width: 100%;
  height: 30px;
  font-size: 24px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  span,
  a {
    margin-right: 10px;
  }
`;

const DeleteBtn = styled.button`
  font-size: inherit;
  padding: 0;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export default function ToDo({ text, id }: IToDo) {
  const dispatch = useDispatch();

  // Delete button
  const onBtnClick = () => dispatch(removeToDo(id));

  return (
    <Wrapper>
      <span>⭐</span>
      <Link to={`/${id}`}>{text}</Link>
      <DeleteBtn onClick={onBtnClick}>❌</DeleteBtn>
    </Wrapper>
  );
}
