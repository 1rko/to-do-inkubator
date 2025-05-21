import {FilterValues, Todolist} from "../app/App.tsx";
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistAction = ReturnType<typeof createTodolistAC>
export type ChangeTodolistTitleAction = ReturnType<typeof changeTodolistTitleAC>
export type changeFilterAction = ReturnType<typeof changeTodolistFilterAC>

//type Actions = DeleteTodolistAction | CreateTodolistAction | ChangeTodolistTitleAction | changeFilterAction

export const deleteTodolistAC = createAction<{ id: string }>('todolists/deleteTodolist')
export const createTodolistAC = createAction('todolists/createTodolist', (title: string) => {
    return {payload: {id: nanoid(), title}}
})
export const changeTodolistTitleAC = createAction<{ id: string, title: string }>('todolists/changeTodolistTitle')
export const changeTodolistFilterAC = createAction<{ id: string, filter: FilterValues }>('todolists/changeFilter')

const initialState: Todolist[] = []

export const todolistsReducer = createReducer(initialState, builder => {
    builder
        .addCase(deleteTodolistAC, (state, action) => {
            const index = state.findIndex(todolist => todolist.id === action.payload.id)
            if (index !== -1) {
                state.splice(index, 1)
            }
        })
        .addCase(createTodolistAC, (state, action) => {
            state.push({...action.payload, filter: "ALL"})
        })
        .addCase(changeTodolistTitleAC, (state, action) => {
            const index = state.findIndex(todolist => todolist.id === action.payload.id)
            if (index !== -1) {
                state[index].title=action.payload.title
            }
        })
        .addCase(changeTodolistFilterAC, (state, action) => {
            const todolist = state.find(todolist => todolist.id === action.payload.id)
            if (todolist) {
                todolist.filter=action.payload.filter
            }
        })
})




