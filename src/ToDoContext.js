import React, { useReducer , createContext , useContext , useRef } from 'react';

//로컬스토리지에 값이 있으면 get으로 가져오고, 없으면 디폴트값으로 리스트 넣어주기
const initialTodos = JSON.parse(localStorage.getItem('todoLS')) || 
    [
      {
        id: 1,
        text: '운동하기',
        done: true
      },
      {
        id: 2,
        text: '뉴스 읽기',
        done: true
      },
      {
        id: 3,
        text: '저녁 약속 가기',
        done: false
      },
      {
        id: 4,
        text: '리액트 공부하기',
        done: false
      }
    ];
  

  //next state를 리턴해주는 함수 => CREATE, TOGGLE, REMOVE
  function todoReducer(state, action) {

    switch (action.type) {
        case 'CREATE':
          return state.concat(action.todo);
        case 'TOGGLE':
          return state.map(todo =>
            todo.id === action.id ? { ...todo, done: !todo.done } : todo
          );
        case 'REMOVE':
          return state.filter(todo => todo.id !== action.id);
        default:
          throw new Error(`Unhandled action type: ${action.type}`);
      }
  }


  //context API
  const TodoStateContext = createContext(null);
  const TodoDispatchContext = createContext(null);
  const TodoNextIdContext = createContext(null);
  const filteredList = createContext(null);

  //context API provider사용할 수 있는 컴포넌트
  export function ToDoProvider({children}){
      const [state, dispatch] = useReducer(todoReducer, initialTodos);
      const nextId = useRef(5);
      const filtered = useRef('FILTERLIST');


      return (
          <TodoStateContext.Provider value={state}>
              <TodoDispatchContext.Provider value={dispatch}>
                  <TodoNextIdContext.Provider value={nextId}>
                    <filteredList.Provider value={filtered}> 
                      {children}
                    </filteredList.Provider>
                  </TodoNextIdContext.Provider>
              </TodoDispatchContext.Provider>
          </TodoStateContext.Provider>
      );
  }

  //custom HOOK : 다른 컴포넌트에서 쉽게 불러와서 사용할 수 있도록 하기
  export function useTodoState() {
    const context = useContext(TodoStateContext);
    if(!context) {
      throw new Error('Cannot find TodoStateContext')
    }
      return useContext(TodoStateContext);
  }

  export function useTodoDispatch() {
    const context = useContext(TodoDispatchContext);
    if(!context) {
      throw new Error('Cannot find TodoDispatchContext')
    }
      return useContext(TodoDispatchContext);
  }

  export function useTodoNextId() {
    const context = useContext(TodoNextIdContext);
    if(!context) {
      throw new Error('Cannot find TodoNextIdContext')
    }
    return useContext(TodoNextIdContext);
  }

  export function useFiltered() {
    const context = useContext(filteredList);
    if(!context) {
      throw new Error('Cannot find filteringContext')
    }
    return useContext(filteredList);
  }


