import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import ToDoItem from './ToDoItem';
import { useTodoState } from '../ToDoContext';

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

  useEffect(() => {localStorage.setItem("todoLS", JSON.stringify(todos))
  },[]);

  useEffect(() => {
      localStorage.todoLS = JSON.stringify(todos);
  }, [todos]);

  return (
    <ToDoListBlock>
      {todos.map(todo => (
        <ToDoItem
          id={todo.id}
          text={todo.text}
          done={todo.done}
          key={todo.id}
        />
      ))}
    </ToDoListBlock>
  );
}

export default ToDoList;
