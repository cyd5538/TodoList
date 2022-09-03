import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodos } from '../slice/Todo/getTodolist';
import { DeleteTodo } from '../slice/Todo/deleteTodo';
import { checkBoxTodos } from '../slice/Todo/checkboxTodo'

const Todolists = () => {
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.getTodos.todos);

    useEffect(() => {
        dispatch(getTodos());
    }, [todos]);

  const DeleteTodos = (id) => {
    dispatch(DeleteTodo(id))
    dispatch(getTodos());
  }
  const Checkboxtoggle = (id) => {
    dispatch(checkBoxTodos(id))
    dispatch(getTodos());
  }

  useEffect(() => {

  },[])

  return (
    <div>
      {todos?.map((todo) => (
        <div key={todo._id}>
            <div>{todo.text}</div>
            <button onClick={() => DeleteTodos(todo._id)}>X</button>
            <button onClick={() => Checkboxtoggle(todo._id)}>{todo.complete ? "true" : "false"}</button>
        </div>
      ))}
    </div>
  );
};

export default Todolists;
