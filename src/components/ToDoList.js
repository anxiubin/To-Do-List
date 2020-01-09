import React, {useEffect} from 'react';
import styled from 'styled-components';
import ToDoItem from './ToDoItem';
import { useTodoState, useTodoNextId, useFiltered} from '../ToDoContext';
import FilteredItem from './FilteredItem';

const ToDoListBlock = styled.div`
    flex: 1; 
    padding: 20px 32px;
    padding-bottom: 48px;
    overflow-y: auto;
`;

//line7 : 부모 컴포넌트 컨텐츠 전체 차지
//line10 : 항목 많아지면 스크롤바 자동생성



function ToDoList() {
  const todos = useTodoState();
  const nextId = useTodoNextId();
  const filtered = useFiltered();
  const copyTodos = todos.slice();

  useEffect(() => {
    localStorage.setItem("todoLS", JSON.stringify(todos));
    localStorage.setItem("nextId", JSON.stringify(nextId));
  },[todos,nextId]);

  useEffect(() => {
      localStorage.todoLS = JSON.stringify(todos);
      localStorage.nextId = JSON.stringify(nextId);
  },[todos, nextId]);

  console.log(filtered.current);
  
          switch (filtered.current) {
            case 'FILTERLIST':
              return (
                <ToDoListBlock>
                  {
                    todos.map(todo => (
                      <ToDoItem
                        id={todo.id}
                        text={todo.text}
                        done={todo.done}
                        key={todo.id}
                      />
                    ))
                  }
                </ToDoListBlock>
              );
            case 'FILTERTODO':
              return (
                <ToDoListBlock>
                {
                  copyTodos.filter(todo => !todo.done).map(todo => (
                    <FilteredItem
                      id={todo.id}
                      text={todo.text}
                      done={todo.done}
                      key={todo.id}
                    />
                  ))
                }
              </ToDoListBlock>
              );
            case 'FILTERDONE':
              return (
                <ToDoListBlock>
                {
                  copyTodos.filter(todo => todo.done).map(todo => (
                    <FilteredItem
                      id={todo.id}
                      text={todo.text}
                      done={todo.done}
                      key={todo.id}
                    />
                  ))
                }
              </ToDoListBlock>
              );
            default:
              throw new Error(`Unhandled action type: ${filtered.current}`);
          }
}

export default ToDoList;