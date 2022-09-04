import React, { useState, useRef } from "react";
import styled from "styled-components";
import TodoInputForm from "./TodoInputForm";
import { AiFillCloseCircle } from "react-icons/ai";
import TodoDate from "./TodoDate";

const TodoInputStyled = styled.div`
  padding-top: 20px;
  padding-left: 15px;
  padding-right: 15px;
  width: 100%;
  position: relative;
  h1{
    color: #a460ed;
  }
  .toggle {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background-color: purple;
    position: absolute;
    right: 20px;
    top: 30px;
    font-size: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    cursor: pointer;
    transition: all ease-in 0.3s;
  }
  .toggle:hover{
    transform: rotate(20deg);
  }

  .formstyle {
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.7);
    .form_container {
      width: 300px;
      height: 200px;
      background-color: #EEEEEE;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .close_btn{
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 2rem;
        color: #9FC9F3;
        cursor:pointer;
      }
      form{
        position: absolute;
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: 10px;
        top:60px;
        input{
          height: 50px;
          font-size: 1.2rem;
          padding-left: 5px;
        }
        button{
          margin-top: 10px;
          height: 50px;
          font-size: 1.2rem;
          background-color: #9FC9F3;
          border:none;
          cursor:pointer;
        }
      }
    }
  }

`;

const TodoInput = () => {
  const [toggle, setToggle] = useState(false);
  const inputRef = useRef();

  const InputOpen = async () => {
    await setToggle(true);
    await inputRef.current.focus();
  };
  const InputClose = () => {
    setToggle(false);
  };
  return (
    <TodoInputStyled>
      <TodoDate />
        <h1>TODO LIST</h1>
        <div onClick={InputOpen} className="toggle">
          +
        </div>
      {toggle ? (
        <div className="formstyle">
          <div className="form_container">
            <div className="close_btn" onClick={InputClose}><AiFillCloseCircle /></div>
            <TodoInputForm inputRef={inputRef} setToggle={setToggle}/>
          </div>
        </div>
      ) : (
        <></>
      )}
    </TodoInputStyled>
  );
};

export default TodoInput;
