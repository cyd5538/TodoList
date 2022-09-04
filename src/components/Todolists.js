import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodos } from "../slice/Todo/getTodolist";
import { DeleteTodo } from "../slice/Todo/deleteTodo";
import { checkBoxTodos } from "../slice/Todo/checkboxTodo";
import styled from "styled-components";
import { AiOutlineCheck, AiFillDelete } from "react-icons/ai";

const TodolistStyle = styled.div`
  width: 100%;
  margin-top: 50px;
  padding-left: 10px;
  padding-right: 10px;
  .todolist_bg:nth-child(2n-1) {
    background-color: #a460ed;
    color: white;
  }
  .todolist_container {
    display: flex;
    justify-content: center;
    align-items: center;
    div:first-child {
      padding-top: 15px;
      padding-bottom: 15px;
      width: 50px;
      text-align: center;
      cursor: pointer;
      font-size: 1.2rem;
    }
    .todolist_text {
      min-width: 300px;
      max-width: 1000px;
      font-size: 1.2rem;
      width: 100%;
    }
    .underline {
      min-width: 300px;
      max-width: 1000px;
      font-size: 1.2rem;
      width: 100%;
      text-decoration: line-through;
    }

    div:last-child {
      width: 50px;
      text-align: center;
    }
    .red {
      color: red;
    }
    .black {
      color: black;
      cursor: pointer;
    }
  }
`;

const Todolists = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.getTodos.todos);

  // 데이터 가져오기
  useEffect(() => {
    dispatch(getTodos());
  }, [todos]);

  // todos 삭제
  const DeleteTodos = (id) => {
    dispatch(DeleteTodo(id));
    dispatch(getTodos());
  };

  // checkbox toggle
  const Checkboxtoggle = (id) => {
    dispatch(checkBoxTodos(id));
    dispatch(getTodos());
  };

  return (
    <TodolistStyle>
      {todos?.map((todo) => (
        <div key={todo._id} className="todolist_bg">
          <div className="todolist_container">
            <div
              className={todo.complete ? "red" : "black"}
              onClick={() => Checkboxtoggle(todo._id)}
            >
              <AiOutlineCheck />
            </div>
            <div className={todo.complete ? "underline" : "todolist_text"}>
              {todo.text}
            </div>
            <div className="black" onClick={() => DeleteTodos(todo._id)}>
              <AiFillDelete />
            </div>
          </div>
        </div>
      ))}
    </TodolistStyle>
  );
};

export default Todolists;
