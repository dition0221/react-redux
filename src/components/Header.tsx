import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { IRootState, addToDo, toggleTheme } from "../store";
import { Link, useMatch, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

const HeaderContainer = styled.header`
  padding: 25px 0;
  background-color: ${(props) => props.theme.bgColor};
  position: sticky;
  top: 0;
`;

const TitleContainer = styled.div`
  width: 100%;
  height: 50px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${(props) => props.theme.textColor};
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  position: relative;
`;

const Title = styled.h1`
  font-size: calc(min(30px, 6vw));
  font-weight: 600;
  margin: 0 auto;
`;

const HomeBtn = styled.button`
  height: 100%;
  aspect-ratio: 1/1;
  position: absolute;
  left: 0;
  border: none;
  background-color: transparent;
  cursor: pointer;
  svg {
    fill: ${(props) => props.theme.textColor};
    &:active {
      fill: tomato;
    }
  }
`;

const ThemeBtn = styled(HomeBtn)`
  left: auto;
  right: 0;
`;

const FormContainer = styled.div``;

const Form = styled.form`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  padding-left: 10px;
  margin-right: 7px;
  font-size: 16px;
`;

const FormBtn = styled.button`
  height: 100%;
  text-transform: uppercase;
  border: 0;
  border-radius: 10px;
  padding: 0 12px;
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
  cursor: pointer;
  &:active {
    background-color: tomato;
  }
`;

const Error = styled.span`
  color: tomato;
  font-style: italic;
  text-decoration: underline;
  position: absolute;
  top: 125%;
  align-items: center;
`;

interface IForm {
  text: string;
}

export default function Header() {
  const dispatch = useDispatch();

  // Title
  const homeMatch = useMatch("/");
  const { id } = useParams();
  const toDos = useSelector((state: IRootState) => state.toDos);
  const toDo = toDos.find((toDo) => toDo.id === parseInt(id + ""));

  // Theme button
  const isDarkTheme = useSelector((state: IRootState) => state.isDarkTheme);
  const toggleThemeMode = () => dispatch(toggleTheme());

  // <form>
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IForm>();
  const onSubmit = ({ text }: IForm) => {
    dispatch(addToDo(text));
    reset();
  };

  return (
    <HeaderContainer>
      <TitleContainer>
        <HomeBtn>
          <Link to={"/"}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
            </svg>
          </Link>
        </HomeBtn>
        <Title>{homeMatch ? "To-Do" : toDo?.text ?? "Undefined"}</Title>
        <ThemeBtn onClick={toggleThemeMode}>
          {isDarkTheme ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M375.7 19.7c-1.5-8-6.9-14.7-14.4-17.8s-16.1-2.2-22.8 2.4L256 61.1 173.5 4.2c-6.7-4.6-15.3-5.5-22.8-2.4s-12.9 9.8-14.4 17.8l-18.1 98.5L19.7 136.3c-8 1.5-14.7 6.9-17.8 14.4s-2.2 16.1 2.4 22.8L61.1 256 4.2 338.5c-4.6 6.7-5.5 15.3-2.4 22.8s9.8 13 17.8 14.4l98.5 18.1 18.1 98.5c1.5 8 6.9 14.7 14.4 17.8s16.1 2.2 22.8-2.4L256 450.9l82.5 56.9c6.7 4.6 15.3 5.5 22.8 2.4s12.9-9.8 14.4-17.8l18.1-98.5 98.5-18.1c8-1.5 14.7-6.9 17.8-14.4s2.2-16.1-2.4-22.8L450.9 256l56.9-82.5c4.6-6.7 5.5-15.3 2.4-22.8s-9.8-12.9-17.8-14.4l-98.5-18.1L375.7 19.7zM269.6 110l65.6-45.2 14.4 78.3c1.8 9.8 9.5 17.5 19.3 19.3l78.3 14.4L402 242.4c-5.7 8.2-5.7 19 0 27.2l45.2 65.6-78.3 14.4c-9.8 1.8-17.5 9.5-19.3 19.3l-14.4 78.3L269.6 402c-8.2-5.7-19-5.7-27.2 0l-65.6 45.2-14.4-78.3c-1.8-9.8-9.5-17.5-19.3-19.3L64.8 335.2 110 269.6c5.7-8.2 5.7-19 0-27.2L64.8 176.8l78.3-14.4c9.8-1.8 17.5-9.5 19.3-19.3l14.4-78.3L242.4 110c8.2 5.7 19 5.7 27.2 0zM256 368a112 112 0 1 0 0-224 112 112 0 1 0 0 224zM192 256a64 64 0 1 1 128 0 64 64 0 1 1 -128 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M144.7 98.7c-21 34.1-33.1 74.3-33.1 117.3c0 98 62.8 181.4 150.4 211.7c-12.4 2.8-25.3 4.3-38.6 4.3C126.6 432 48 353.3 48 256c0-68.9 39.4-128.4 96.8-157.3zm62.1-66C91.1 41.2 0 137.9 0 256C0 379.7 100 480 223.5 480c47.8 0 92-15 128.4-40.6c1.9-1.3 3.7-2.7 5.5-4c4.8-3.6 9.4-7.4 13.9-11.4c2.7-2.4 5.3-4.8 7.9-7.3c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-3.7 .6-7.4 1.2-11.1 1.6c-5 .5-10.1 .9-15.3 1c-1.2 0-2.5 0-3.7 0c-.1 0-.2 0-.3 0c-96.8-.2-175.2-78.9-175.2-176c0-54.8 24.9-103.7 64.1-136c1-.9 2.1-1.7 3.2-2.6c4-3.2 8.2-6.2 12.5-9c3.1-2 6.3-4 9.6-5.8c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-3.6-.3-7.1-.5-10.7-.6c-2.7-.1-5.5-.1-8.2-.1c-3.3 0-6.5 .1-9.8 .2c-2.3 .1-4.6 .2-6.9 .4z" />
            </svg>
          )}
        </ThemeBtn>
      </TitleContainer>

      <FormContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("text", {
              required: "Error: Please write a to-do.",
              maxLength: {
                value: 10,
                message: "Error: Please write less then 10.",
              },
            })}
            type="text"
            required
            maxLength={10}
          />
          <FormBtn>Add</FormBtn>
          <Error>{errors.text?.message}</Error>
        </Form>
      </FormContainer>
    </HeaderContainer>
  );
}
