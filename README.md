# React - Redux

### Redux 입문. Redux beginner.

<img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white"/> <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white"/> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white"/> <img src="https://img.shields.io/badge/styled&dash;components-DB7093?style=flat-square&logo=styledcomponents&logoColor=white"/>  
<img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white"/> <img src="https://img.shields.io/badge/React Router-CA4245?style=flat-square&logo=reactrouter&logoColor=white"/> <img src="https://img.shields.io/badge/React Hook Form-EC5990?style=flat-square&logo=reacthookform&logoColor=white"/> <img src="https://img.shields.io/badge/Redux-764ABC?style=flat-square&logo=redux&logoColor=white"/> <img src="https://img.shields.io/badge/React&dash;Redux-764ABC?style=flat-square&logo=redux&logoColor=white"/> <img src="https://img.shields.io/badge/Redux Toolkit-764ABC?style=flat-square&logo=redux&logoColor=white"/>

---

- **23-12-09 : #0.1 ~ #0.4 / Set up**
  - Redux
    - JavaScript App들의 state를 관리하는 방법을 가지는 라이브러리
      - React, Vue, Angular, VanillaJS 등 가능
    - 설치법 : `npm i redux`
- **23-12-13 : #1.0 ~ #4.3 / createStore + react-redux + Redux Toolkit(1)**
  - createStore
    - state를 넣을 수 있는 장소를 생성
    - 기본형 : `const 스토어명 = createStore(리듀서);`
      - 리듀서 : state를 수정하는 함수(modifier)이며, state를 인자로 받을 수 있음
        - 리듀서 기본형 : `const 리듀서명 = (state = 기본값) => { ... };`
        - 내부 코드는 if-else문 보다 switch문 사용을 권장
      - ex.
        ```
        const countModifier = (count = 0) => {
          console.log(count);
          return count;
        };
        const countStore = createStore(countModifier);
        ```
    - '스토어명.getState()'를 통해 state값을 가져올 수 있음
  - action
    - 리듀서를 통해 state값을 수정하기 위한 방법이며, 리듀서의 2번째 인자에서 사용
      - state 변화를 일으키는 객체
    - 선언법 : `const 리듀서명 = (state = 기본값, action) => { ... };`
    - 사용법 : 스토어명.dispatch({ type: 액션의종류, payload?: 관련데이터 });
      - 무조건 object형태로 사용해야 하며, 'type'프로퍼티를 사용해야 함
        - 2개 이상의 값을 보낼 때, 사용자정의 프로퍼티를 사용 가능
    - ex.
      ```
      const countModifier = (count = 0, { type }) => {
        switch (type) {
          case "ADD":
            return count + 1;
          case "MINUS":
            return count - 1;
          default:
            return count;
        }
      };
      countStore.dispatch({ type: "ADD" });
      ```
  - 스토어명.subscribe()
    - store 내부의 변화를 알려줌
    - 기본형 : `스토어명.subscribe(콜백함수);`
      - 콜백함수 : 변화 시 실행할 함수
    - ex.
      ```
      countStore.subscribe(() => number.innerText = countStore.getState());
      ```
  - 리듀서에서는 mutation 금지
    - 원래의 값을 변형하는 행위는 금지 (.push(), .pop() 등)
    - 새로운 state를 return 해야 함
      - ...(spread) 등을 이용할 것
      - '배열.filter()'는 새로운 배열을 만드므로, 사용 가능
  - 리듀서 리팩토링
    - action의 형태를 만드는 함수와 dispatch를 따로 사용하는 것을 권장
  - 배열에서 원하는 항목 삭제
    - id(Date.now())값과 배열.filter()를 사용
      - '배열.filter()'는 원래의 배열을 변화시키지 않으면서, 새로운 변수를 생성
    - ex.
      ```
      const reducer = (state = [], { type, text, id}) => {
        switch (type) {
          case ADD_TODO:
            return [{ text, id: Date.now() }, ...state];
          case DELETE_TODO:
            return state.filter(toDo => toDo.id !== id);
          default:
            return state;
        }
      };
      const dispatchDeleteToDo = (e) => {
        const id = parseInt(e.target.parentNode.id);
        store.dispatch({ type: DELETE_TODO, id });
      };
      ```
  - React-Redux
    - React에서 subscribe를 하는 state에 대해 re-rendering을 하기 위해 사용하는 라이브러리
    - 설치법 : `npm i redux react-redux`
    - 설정법 : &lt;Provider store={스토어명}&gt;으로 App을 감싸줌
  - connect()
    - 컴포넌트를 store에 연결시켜주는 메서드 (전통적인 방식)
      - '스토어명.getStore()' 대신에 사용함
      - Hook API를 사용하는 것이 권장 (useSelector, useDispatch 등)
    - 기본형
      ```
      function mapStateToProps(state, ownProps?) { ... };
      function mapDispatchToProps(dispatch, ownProps?) { ... };
      connect(mapStateToProps, mapDispatchToProps?) (컴포넌트명);
      ```
    - mapStateToProps 함수
      - return값(object)은 컴포넌트의 prop에 추가될 것
      - state : '스토어명. getStore()'의 값
      - 'useSelector'로 대체 가능
    - mapDispatchToProps 함수
      - return값(object)은 컴포넌트의 prop에 추가될 것
      - dispatch : '스토어명.dispatch()'의 값
      - 'useDispatch'로 대체 가능
    - ex.
      ```
      interface IHomeProps {
        toDos: IState[];
        addToDo: (text: string) => IAction;
      }
      function Home({ toDos, addToDo }: IHomeProps) {
        // ......
        return;
      }
      function mapStateToProps(state: IState[]) {
        return { toDos: state };
      }
      function mapDispatchToProps(dispatch:Dispatch<IAction>) {
        return {
          addToDo: (text: string) => dispatch(actionCreators.addToDo(text)),
        };
      }
      export default connect(mapStateToProps, mapDispatchToProps)(Home);
      ```
- **23-12-16 : #4.0 ~ #4.3 / react-redux + Redux Toolkit(2)**

---

- ToDo
  - 'redux-persist' 패키지 사용하기
