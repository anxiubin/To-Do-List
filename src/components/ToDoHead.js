import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useTodoState, useTodoDispatch } from '../ToDoContext';
import { IoIosListBox } from "react-icons/io";
import { MdIndeterminateCheckBox, MdCheckBox } from "react-icons/md";


const ToDoHeadBlock = styled.div`
  h1 {
    margin: 0;
    font-size: 36px;
    color: #343a40;
  }
  .day {
    margin-top: 4px;
    color: #868e96;
    font-size: 21px;
  }
  .tasks-left {
    color: #20c997;
    font-size: 18px;
    margin-top: 10px;
    font-weight: bold;
    float: left;
  }
  .origin-list {
    color: #20c997;
    font-size: 24px;
    margin-top: 10px;
    float: right;
  }
  .filteredUndone {
    color: #20c997;
    font-size: 24px;
    margin-top: 10px;
    float: right;
  }
  .filteredDone {
    color: #20c997;
    font-size: 24px;
    margin-top: 10px;
    float: right;
  }
  padding-top: 48px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e9ecef;
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
  const dispatch = useTodoDispatch();
  const undoneTasks = todos.filter(todo => todo.done === false);

  useEffect(() => {
    localStorage.setItem("FilteredLS", 'ORIGIN');
  }, []);

  const setORIGIN = () => {
    localStorage.setItem("FilteredLS", 'ORIGIN');
    dispatch({
      type: 'ORIGIN',
    });
  };
  const setUNDONE = () => {
    localStorage.setItem("FilteredLS", 'UNDONE');
    dispatch({
      type: 'UNDONE',
    });
  };
  const setDONE = () => {
    localStorage.setItem("FilteredLS", 'DONE');
    dispatch({
      type: 'DONE',
    });
  };

  return (
    <ToDoHeadBlock>
      <h1>{dateString}</h1>
      <div className="day">{dayName}</div>
      <div className="tasks-left">할 일 {undoneTasks.length}개 남음</div>
      <div className="filteredDone" onClick={setDONE} >
        <MdCheckBox />
      </div>
      <div className="filteredUndone" onClick={setUNDONE} >
        <MdIndeterminateCheckBox />
      </div>
      <div className="origin-list" onClick={setORIGIN}>
        <IoIosListBox />
      </div>
    </ToDoHeadBlock>
  );
}
export default ToDoHead;