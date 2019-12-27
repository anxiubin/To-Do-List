import React from 'react';
import styled from 'styled-components';
import ToDoItem from './ToDoItem';
import { useTodoState } from '../ToDoContext';

const ToDoListBlock = styled.div`
    flex: 1;
    padding: 20px 32px;
    padding-bottom: 48px;
    overflow-y: auto;
`;

function ToDoList() {
  const todos = useTodoState();
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