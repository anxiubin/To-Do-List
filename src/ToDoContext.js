import React, { useReducer , createContext , useContext , useRef } from 'react';

const initialTodos = [
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
  

  //다음 상태를 리턴해주는 함수 => CREATE, TOGGLE, REMOVE
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

  //context API provider사용
  export function ToDoProvider({children}){
      const [state, dispatch] = useReducer(todoReducer, initialTodos);
      const nextId = useRef(5);
      return (
          <TodoStateContext.Provider value={state}>
              <TodoDispatchContext.Provider value={dispatch}>
                  <TodoNextIdContext.Provider value={nextId}>
                  {children}
                  </TodoNextIdContext.Provider>
              </TodoDispatchContext.Provider>
          </TodoStateContext.Provider>
      );
  }

  //custom HOOK
  export function useTodoState() {
      return useContext(TodoStateContext);
  }

  export function useTodoDispatch() {
      return useContext(TodoDispatchContext);
  }

  export function useTodoNextId() {
    return useContext(TodoNextIdContext);
  }