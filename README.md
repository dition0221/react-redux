# React - Redux

### Redux를 사용해 To-Do List를 생성합니다. To-Do List web site using Redux.

<img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white"/> <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white"/> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white"/> <img src="https://img.shields.io/badge/styled&dash;components-DB7093?style=flat-square&logo=styledcomponents&logoColor=white"/>  
<img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white"/> <img src="https://img.shields.io/badge/React Router-CA4245?style=flat-square&logo=reactrouter&logoColor=white"/> <img src="https://img.shields.io/badge/React Hook Form-EC5990?style=flat-square&logo=reacthookform&logoColor=white"/> <img src="https://img.shields.io/badge/Framer Motion-0055FF?style=flat-square&logo=framer&logoColor=white"/> <img src="https://img.shields.io/badge/React Helmet Async-61DAFB?style=flat-square&logoColor=white"/> <img src="https://img.shields.io/badge/gh&dash;pages-222?style=flat-square&logo=githubpages&logoColor=white"/>  
<img src="https://img.shields.io/badge/Redux-764ABC?style=flat-square&logo=redux&logoColor=white"/> <img src="https://img.shields.io/badge/React Redux-764ABC?style=flat-square&logo=redux&logoColor=white"/> <img src="https://img.shields.io/badge/Redux Toolkit-764ABC?style=flat-square&logo=redux&logoColor=white"/> <img src="https://img.shields.io/badge/Redux Persist-764ABC?style=flat-square&logo=redux&logoColor=white"/>

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
  - Redux Toolkit (RTK)
    - 많은 지름길(shortcut)들이 있는 Redux 패키지
      - Redux 사용 시 많은 양의 코드를 사용해야하는 불편함으로부터 탄생
      - 적은 양의 Redux 코드를 짤 수 있도록 도와줌
    - 설치법 : `npm i @reduxjs/toolkit`
      - React에서 사용 시 'redux'와 'react-redux' 패키지 또한 필요함
    - <a href="https://ko.redux.js.org/introduction/getting-started" target="_blank">공식 문서</a>
  - createAction
    - action의 type을 생성하는 메서드
      - action : state 변화를 일으키는 작업을 나타내는 객체이며, action이 어떤 종류의 작업을 수행할 것인지 식별하는 문자열인 type 프로퍼티를 가지고 있음
    - 선언법 : `const 액션명 = createAction<페이로드제네릭>("타입명");`
      - ex.
        ```
        interface IAddToDo {
          text: string;
        }
        const addToDo = createAction<IAddToDo>("ADD");
        ```
    - reducer의 switch문에서 사용 시 '액션명.type'형태로 사용
      - ex. `console.log(addToDo.type); // "ADD"`
    - 실행법
      ```
      const 디스패치명 = useDispatch();
      디스패치명(액션명(데이터));
      ```
      - payload : action에게 보내고 싶은 데이터 (자동으로 들어감)
        - 'action.payload' 형태로 사용
  - createReducer
    - reducer를 생성하는 메서드
      - reducer : 현재의 state와 action을 받아서 다음 state를 변환하는 함수
    - 기본형
      ```
      const 리듀서명 = createReducer(초기값 as 제네릭, (builder) => {
        builder
          .addCase(액션명, (state, action) => {
            // return문
          })
          ......
      });
      ```
    - state를 mutate해도 됨 (원래는 불가능했음)
      - 새로운 state를 return 하거나, state를 mutate해야 함 (return 하지않음)
      - RTK는 'Immer'라이브러리를 포함하고 있기 때문 (알아서 새로운 state를 만듦)
    - ex.
      ```
      interface IState {
        text: string;
        id: number;
      }
      const reducer = createReducer([] as IState[], (builder) => {
        builder
          .addCase(addToDo, (state, action) => {
            state.push({ text: action.payload, id: Date.now() });
          })
          .addCase(deleteToDo, (state, action) =>
            state.filter((toDo) => toDo.id !== action.payload)
          );
      });
      ```
  - configureStore
    - 'createStore'메서드의 대체품이며, 미들웨어와 기본값이 추가되었음
    - 기본형 : `const 스토어명 = configureStore({ reducer: 리듀서명 });`
      - 여러 개의 reducer들을 담은 루트리듀서 객체를 넣을 수 있음 (combineReducers()를 이용함)
    - 브라우저의 'Redux DevTools' 확장프로그램을 통해 현재 state값을 확인 가능
      - RTK가 아니라 Redux만 있어도 사용 가능
  - createSlice
    - action과 reducer를 한 번에 정의할 수 있는 함수
    - 기본형
      ```
      const 변수명 = createSlice({
        name: 이름,
        initialState: 초기값 as 제네릭,
        reducers: {
          액션명: (state, action: PayloadAction<제네릭>) => {
            // return문
          },
          ......
        },
      });
      ```
    - 리듀서명은 '변수명.reducer'로 사용 가능
    - 액션명은 '변수명.actions.액션명'으로 사용 가능
    - ex.
      ```
      const toDos = createSlice({
        name: "toDos",
        initialState: [] as IState[],
        reducers: {
          add: (state, action: PayloadAction<Text>) => {
            state.push({ text: action.payload, id: Date.now() });
          },
          remove: (state, action: PayloadAction<Id>) =>
            state.filter((toDo) => toDo.id !== action.payload),
        },
      });
      export const { add, remove } = toDos.actions;
      const store = configureStore({ reducer: toDos.reducer });
      export default store;
      ```
  - combineReducers()
    - 여러 개의 reducer들을 (하나의 루트리듀서로) 합치는 데 사용하는 함수
      - 기본적으로 redux store는 하나의 루트리듀서만을 사용함
      - app의 state를 독립적인 reducer로 나누고, 각 reducer에 대한 action을 처리 가능
    - 기본형
      ```
      const 루트리듀서명 = combineReducers<제네릭>({
        리듀서명: 리듀서변수,
        ......
      });
      ```
    - ex.
      ```
      // 각 리듀서를 'createSlice()'로 생성 시
      const rootReducer = combineReducers({
        counter: counterSlice.reducer,
        user: userSlice.reducer,
      });
      ```
    - 각 reducer가 담당하는 state는 'state.리듀서명'으로 접근 가능
  - reducer에서 currentState 복제하기
    - 기본형
      ```
      const 리듀서명 = (currentState, action) => {
        const 복제변수명 = { ...currentState };
        return 복제변수명;
      };
      ```
  - useSelector [READ]
    - Redux store의 state를 선택하기(가져오기) 위해 사용하는 hook
      - 컴포넌트 내에서 redux store의 state를 읽고, re-rendering을 함
      - state가 변경될 때 마다 자동으로 re-rendering을 함
    - 기본형 : `const 변수명 = useSelector(콜백함수, ?);`
      - 콜백함수 : store에서 필요한 state를 선택함
        - 기본형 : `(state: 루트스테이트제네릭) => state.슬라이스명`
    - ex.
      ```
      // store.ts
      export interface IRootState {
        toDos: IToDo[];
      }
      export const toDos = createSlice({
        name: "toDos",
        initialState: [] as IToDo[],
        reducers: { ... },
      });
      const store = configureStore({ reducer: toDos.reducer });
      export default store;
      // 컴포넌트.tsx
      const toDos = useSelector((state: IRootState) => state.toDos);
      ```
  - useDispatch [WRITE]
    - redux store에 action을 dispatch하는 데 사용하는 hook
      - 컴포넌트 내에서 redux stor에 action을 보냄 -> state 업데이트
    - 선언법 : `const 디스패치명 = useDispatch();`
    - 기본형 : `디스패치명(액션명(?페이로드));`
    - ex.
      ```
      const dispatch = useDispatch();
      const onClick = () => dispatch(addToDo(text));
      ```
- **23-12-19 : Redux-Persist + Deploy**
  - Redux-Persist 패키지
    - redux의 state를 지속적으로 저장하고 복원하기 위한 라이브러리
      - 웹 외에도 사용 가능 (React Native 등)
      - 'recoil-persist'와 같은 기능
    - 설치법 : `npm i redux-persist`
    - 사용법
      1. redux-persist의 설정객체를 생성하기
         - 기본형
           ```
           const 설정객체명 = {
             key: 키명,
             storage: 스토맂,
             blacklist?: ["리듀서명"],
             whitelist?: ["리듀서명"],
           };
           ```
         - 스토리지
           - localStorage : `import storage from "redux-persist/lib/storage;"`
           - sessionStorage : `import storageSession from "redux-persist/lib/storage/session";`
           - 다른 스토리지들은 <a href="https://github.com/rt2zz/redux-persist?tab=readme-ov-file#storage-engines" target="_blank">공식 문서</a> 참고
           - 선언 파일을 찾을 수 없을 시 'react-app-env.d.ts'에서 `/// <reference types="redux-persist" />`를 추가
         - ex.
           ```
           import storage from "redux-persist/lib/storage";
           const persistConfig = {
             key: "root",
             storage,
           };
           ```
      2. reducer를 Redux-Persist에 연결하는 store를 생성하기
         - 기본형
           ```
           const 지속리듀서명 = persistReducer(설정객체, 루트리듀서);
           const 스토어명 = configureStore({ reducer: 지속리듀서명 });
           ```
         - 브라우저 콘솔에서 직렬화 error 시 'configureStore'에 아래와 같은 middleware 프로퍼티를 추가
           ```
           middleware: (getDefaultMiddleware) =>
             getDefaultMiddleware({
               serializableCheck: false,
             }),
           ```
           - Redux에서 값을 주고, 받을 떄 object 형태의 값을 string 형태로 변환(JSON.stringify)하는데, 이 상황에서 변환이 불가능한 값을 전달했다는 error
             - 직렬화 : object -> string으로 변환하는 것 (JSON.stringify)
             - 역직렬화 : string -> object로 변환하는 것 (JSON.parse)
           - <a href="https://despiteallthat.tistory.com/237" target="_blank">참고자료</a>
         - ex.
           ```
           const rootReducer = combineReducers({ toDos: toDos.reducer });
           const persistedReducer = persistReducer(persistConfig, rootReducer);
           export const store = configureStore({
             reducer: persistedReducer,
             middleware: (getDefaultMiddleware) =>
               getDefaultMiddleWare({
                 serializableCheck: false,
               }),
           });
           ```
      3. 스토리지에 지속시키는 store 생성하기
         - 기본형 : `const 지속스토어명 = persistStore(스토어명);`
         - ex. `export const persistedStore = persistStore(store);`
      4. '&lt;PersistGate&gt;' 컴포넌트로 &lt;App /&gt;을 감싸주기
         - 기본형
           ```
           <Provider store={store}>
             <PersistGate persistor={지속스토어명} loading?={로딩중보여줄컴포넌트}>
               <App / >
             </PersistGate>
           </Provider>
           ```
         - 'persistor' 프로퍼티 : 지속스토어를 첨부
         - 'loading' 프로퍼티 : [옵션] 로딩 중에 보여줄 컴포넌트
    - <a href="https://github.com/rt2zz/redux-persist#readme" target="_blank">공식 문서</a>
    - <a href="https://velog.io/@bcl0206/%EC%83%88%EB%A1%9C%EA%B3%A0%EC%B9%A8-%ED%9B%84%EC%97%90%EB%8F%84-store-state-%EC%9C%A0%EC%A7%80%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95-Redux-persist" target="_blank">참고 자료</a>
- **23-12-20 : Deploy(2)**
  - Fix : to-do 입력 시 무조건 홈으로 이동하도록 수정
  - Update : rich link preview, favicon 추가
  - ~~Issue : rich link preview의 썸네일이 제대로 출력되지 않는 현상~~
- **23-12-22 : Deploy(3)**
  - Fix : rich link preview의 썸네일이 제대로 출력되지 않는 현상 수정
    - <a href="https://veonr.com/blog/relative-vs-absolute-og-image-video-urls" target="_blank">상대경로를 사용하지 말고, 프로토콜을 포함한 전체 URL 경로를 사용할 것</a>
