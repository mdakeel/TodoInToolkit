import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todo: [],
    sort: "All",
};

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        setTodo: (state, action) => {
            state.todo = action.payload;
        },
        addTodo: (state, action) => {
            state.todo = [...state.todo, action.payload];
        },
        removeTodo: (state, action) => {
            state.todo = state.todo.filter((todo) => todo.id !== action.payload.id);
        },
        updateTodo: (state, action) => {
            const { id, task } = action.payload;
            const todo = state.todo.find(todo => todo.id === id);
            if (todo) {
                todo.task = task;
            }
        },
        sortTodo: (state, action) => {
            state.sort = action.payload;
        },
        toggleCompleted: (state, action) => {
            const { id } = action.payload;
            const todo = state.todo.find(todo => todo.id === id);
            if (todo) {
                todo.completed = !todo.completed;
            }
        }
    }
});

export const { setTodo, addTodo, removeTodo, updateTodo, sortTodo, toggleCompleted } = todoSlice.actions;
export default todoSlice.reducer;
