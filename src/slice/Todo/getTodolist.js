import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
const PROXY = window.location.hostname === 'localhost' ? '' : 'https://mern-epxress-todo-api.herokuapp.com';
export const getTodos = createAsyncThunk(
    'getTodos',
    async () => {
        const response = await axios.get(`${PROXY}/todos`);
        const data = response.data
        return data
    }
)

export const getTodolist = createSlice({
    name: "getTodos",
    initialState: {
        todos: [],
        isLoading : false
    },
    extraReducers: {
        [getTodos.pending]: (state) => {
            state.isLoading = true
        },
        [getTodos.fulfilled]: (state, action) => {
            state.isLoading = false
            state.todos = action.payload;
        },
        [getTodos.rejected]: (state, action) => {
            state.isLoading = true
        },
    }
})

export default getTodolist.reducer;