import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from '../slice/Todo/addTodos';
import { getTodos } from '../slice/Todo/getTodolist';


const TodoInput = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const addTodos = useSelector((state) => state.addTodo);
  const todos = useSelector((state) => state.getTodos.todos);

  const onSubmit = async (e) => {
    e.preventDefault();
    if(text){
      dispatch(addTodo(text));
      setText("");
    }else{
      alert("텍스트 입력하세요")
    }
    dispatch(getTodos());
  };
  
 

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Enter a Key"
          value={text}
          name="text"
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Click</button>
      </form>
    </div>
  );
};

export default TodoInput;
