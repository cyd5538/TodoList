import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

export const addTodo = createAsyncThunk(
    'addTodos',
    async (text) => {
        const response = await axios.post('/todo/new', {text});
        return response.data;
    }
)

export const addTodos = createSlice({
    name: "addtodo",
    initialState: {
        text: "",
        isLoading : false
    },
    extraReducers: {
        [addTodo.pending]: (state) => {
            state.isLoading = true
        },
        [addTodo.fulfilled]: (state, action) => {
            state.isLoading = false
            state.text = action.payload;
        },
        [addTodo.rejected]: (state, action) => {
            state.isLoading = true
        },
    }
})

export default addTodos.reducer;