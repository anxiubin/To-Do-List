import React, { useEffect} from 'react';
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
  },[todos]);

  useEffect(() => {
      localStorage.todoLS = JSON.stringify(todos);
  },[todos]);

  const filterType = localStorage.getItem('FilteredLS');

  const renderTodoList = (filterType) => {
    let newTodo;
    switch(filterType) {
       case 'ORIGIN':
         newTodo = todos;
         break;
       case 'UNDONE':
         newTodo = todos.filter(todo => todo.filterType === true);
         break;
       case 'DONE':
         newTodo = todos.filter(todo => todo.filterType === true);
         break;
       default:
         newTodo = todos;
    } 
    return (
     <ToDoListBlock>
       {newTodo.map(todo => (
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

  

  return (
    <>
    {renderTodoList(filterType)}
    </>
  );
}

export default ToDoList;