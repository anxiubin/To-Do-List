import React from 'react';
import styled from 'styled-components';
import { useTodoState } from '../ToDoContext';
import { MdIndeterminateCheckBox, MdCheckBox } from 'react-icons/md';

const ToDoHeadBlock = styled.div`
  h1 {
    margin: 0;
    font-size: 36px;
    color: #343a40;
  }
  .day {
    margin-top: 10px;
    color: #868e96;
    font-size: 21px;
    margin-bottom: 10px;
  }
  .tasks-left {
    color: #20c997;
    font-size: 18px;
    margin-top: 50px;
    font-weight: bold;
    margin-right: 280px;
  }
  .taskAndBtn {
    box-sizing: border-box;
  }
  padding-top: 48px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e9ecef;
  position: relative;
`;

const TodoFolder = styled.span`
  font-size: 30px;
  position: absolute;
  transform: translate(0, -6px);
`;

const DoneFolder = styled.span`
  font-size: 30px;
  position: absolute;
  transform: translate(0, -6px);
  margin-left: 25px;
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
  const filterTodo = () => {
    alert('todo')
  };
  const filterDone = () => {
    alert('done')
  };

  return (
    <ToDoHeadBlock>
      <h1>{dateString}</h1>
      <div className="day">{dayName}</div>
      <div className="taskAndBtn">
      <span className="tasks-left">할 일 {undoneTasks.length}개 남음</span>
      <TodoFolder onClick={filterTodo}>
        <MdIndeterminateCheckBox/>
      </TodoFolder>
      <DoneFolder onClick={filterDone}>
        <MdCheckBox/>
      </DoneFolder>
      </div>
    </ToDoHeadBlock>
  );
}
export default ToDoHead;