import { useSelector } from "react-redux";
import { IRootState } from "../store";
import styled from "styled-components";
// Components
import ToDo from "../components/ToDo";
import { Helmet } from "react-helmet-async";

const Wrapper = styled.main``;

export default function Home() {
  // Redux: toDos
  const toDos = useSelector((state: IRootState) => state.toDos);

  return (
    <>
      <Helmet>
        <title>To-Do | dition0221</title>
      </Helmet>

      <Wrapper>
        <ul>
          {toDos?.map((toDo) => (
            <ToDo {...toDo} key={toDo.id} />
          ))}
        </ul>
      </Wrapper>
    </>
  );
}
