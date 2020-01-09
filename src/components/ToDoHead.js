import React from 'react';
import styled from 'styled-components';
import { useTodoState } from '../ToDoContext';
import { MdIndeterminateCheckBox, MdCheckBox } from "react-icons/md";
import { IoIosListBox } from "react-icons/io";
import { useFiltered } from "../ToDoContext";

const ToDoHeadBlock = styled.div`
  h1 {
    margin: 0;
    font-size: 36px;
    color: #343a40;
  }
  .day {
    margin-top: 5px;
    margin-bottom: 5px;
    color: #868e96;
    font-size: 21px;
  }
  .tasks-left {
    color: #20c997;
    font-size: 18px;
    margin-top: 40px;
    font-weight: bold;
    margin-right: 250px;
  }
  padding-top: 48px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e9ecef;
`;

const ListFolder = styled.span`
  font-size: 28px;
  position: absolute;
  transform: translate(0, -4px);
`;

const TodoFolder = styled.span`
  font-size: 30px;
  position: absolute;
  transform: translate(0, -6px);
  margin-left: 25px;
`;

const DoneFolder = styled.span`
  font-size: 30px;
  position: absolute;
  transform: translate(0, -6px);
  margin-left: 50px;
`;


function ToDoHead() {
  const today = new Date();
  const dateString = today.toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const dayName = today.toLocaleString('ko-KR', { weekday: 'long' });

  const todos = useTodoState();
  const undoneTasks = todos.filter(todo => todo.done === false);

  const filtered = useFiltered();

  const filteredList = () => {
    filtered.current = 'FILTERLIST';
  };

  const filteredTodo = () => {
    filtered.current = 'FILTERTODO';
  };

  const filteredDone = () => {
    filtered.current = 'FILTERDONE';
  };


  return (
    <ToDoHeadBlock>
      <h1>{dateString}</h1>
      <div className="day">{dayName}</div>
      <span className="tasks-left">할 일 {undoneTasks.length}개 남음</span>
      <ListFolder onClick={filteredList} >
        <IoIosListBox />
      </ListFolder>
      <TodoFolder onClick={filteredTodo} >
        <MdIndeterminateCheckBox/>
      </TodoFolder>
      <DoneFolder onClick={filteredDone} >
        <MdCheckBox/>
      </DoneFolder>
    </ToDoHeadBlock>
  );
}
export default ToDoHead;