import React from 'react';
import styled from 'styled-components';

const ToDoTemplateBlock = styled.div`
    width: 512px;
    height: 768px;

    position: relative;
    background: white;
    border-radius: 16px;
    box-shadow: 0 0 8px rgba(0,0,0,0.04);
    margin: 0 auto;
    margin-top: 96px;
    margin-bottom: 32px;

    display: flex;
    flex-direction: column;
`;

//chidren 컴포넌트들을 화면에 보이도록 하기

function ToDoTemplate({ children }) {
  return (
    <ToDoTemplateBlock> 
      { children }  
    </ToDoTemplateBlock>
  );
}
export default ToDoTemplate;