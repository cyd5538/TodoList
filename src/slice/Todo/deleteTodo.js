import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

export const DeleteTodo = createAsyncThunk(
    'DeleteTodo',
    async (id) => {
        const response = await axios.delete(`/todo/delete/${id}`);
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