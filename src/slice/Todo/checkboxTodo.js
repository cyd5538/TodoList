import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'


export const checkBoxTodos = createAsyncThunk(
    'checkboxtodos',
    async (id) => {
        const response = await axios.get(`/todo/complete/${id}`);
        const data = response.data
        return data
    }
)

export const checkBoxTodo = createSlice({
    name: "getTodos",
    initialState: {
        complete: false,
        isLoading : false
    },
    extraReducers: {
        [checkBoxTodos.pending]: (state) => {
            state.isLoading = true
        },
        [checkBoxTodos.fulfilled]: (state, action) => {
            state.isLoading = false
            state.complete = !false;
        },
        [checkBoxTodos.rejected]: (state, action) => {
            state.isLoading = true
        },
    }
})

export default checkBoxTodo.reducer;