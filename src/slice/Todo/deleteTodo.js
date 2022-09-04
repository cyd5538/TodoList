import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
const PROXY = window.location.hostname === 'localhost' ? '' : 'https://mern-epxress-todo-api.herokuapp.com';
export const DeleteTodo = createAsyncThunk(
    'DeleteTodo',
    async (id) => {
        const response = await axios.delete(`${PROXY}/todo/delete/${id}`);
        return response.data
    }
  
)

export const DeleteTodos = createSlice({
    name: "deleteTod",
    initialState: {
        id: "",
        isLoading : false
    },
    extraReducers: {
        [DeleteTodo.pending]: (state) => {
            state.isLoading = true
        },
        [DeleteTodo.fulfilled]: (state, action) => {
            state.isLoading = false
            state.id = action.payload;
        },
        [DeleteTodo.rejected]: (state, action) => {
            state.isLoading = true
        },
    }
})

export default DeleteTodos.reducer;