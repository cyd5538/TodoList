import {configureStore} from '@reduxjs/toolkit';
import getTodoReducer from '../slice/Todo/getTodolist'
import addtodoReducer from '../slice/Todo/addTodos'
import DeletetodoReducer from '../slice/Todo/deleteTodo'
import CheckboxtodoReducer from '../slice/Todo/checkboxTodo'

export const store = configureStore({
    reducer: {
        getTodos : getTodoReducer,
        addtodo : addtodoReducer,
        deletetodo : DeletetodoReducer,
        checkboxtodo : CheckboxtodoReducer,
    }
})