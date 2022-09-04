import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from '../slice/Todo/addTodos';
import { getTodos } from '../slice/Todo/getTodolist';

const TodoInputForm = ({setToggle, inputRef}) => {
    const [text, setText] = useState("");
    const dispatch = useDispatch();

    const onSubmit = async (e) => {
      e.preventDefault();
      if(text){
        dispatch(addTodo(text));
        setText("");
        setToggle(false);
      }else{
        alert("텍스트 입력하세요")
      }
      dispatch(getTodos());
    };
    
  return (
    <>
        <form onSubmit={onSubmit}>
            <input
            type="text"
            placeholder="할 일을 입력해주세요."
            value={text}
            name="text"
            onChange={(e) => setText(e.target.value)}
            ref={inputRef}
            />
            <button type="submit">Enter</button>
        </form>
     </>
  )
}

export default TodoInputForm;