import {TaskState} from "../app/App.tsx";
import {createTodolistAC, deleteTodolistAC} from "./todolists-reducer.ts";
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

export const deleteTaskAC = createAction<{ todolistId: string, taskId: string }>(
    'tasks/deleteTask'
)
export const deleteAllTasksAC = createAction<{ todolistId: string }>(
    'tasks/deleteAllTasks'
)
export const createTaskAC = createAction(
    'tasks/createTask', (payload: { todolistId: string, title: string }) => {

        return {payload: {...payload, taskId: nanoid()}}
    }
)
export const changeTaskStatusAC = createAction<{ todolistId: string, taskId: string, isDone: boolean }>(
    'tasks/changeTaskStatus'
)
export const changeTaskTitleAC = createAction<{ todolistId: string, taskId: string, title: string }>(
    'tasks/changeTaskTitle'
)

const initialState: TaskState = {}

export const tasksReducer = createReducer(initialState, builder => {
    builder
        .addCase(createTodolistAC, (state, action) => {
            state[action.payload.id] = []
        })
        .addCase(deleteTodolistAC, (state, action) => {
            delete state[action.payload.id]
        })
        .addCase(createTaskAC, (state, action) => {
            state[action.payload.todolistId].unshift({
                id: action.payload.taskId,
                title: action.payload.title,
                isDone: false
            })
        })
        .addCase(deleteTaskAC, (state, action) => {
            let index = state[action.payload.todolistId].findIndex(task =>
                task.id === action.payload.taskId
            )
            if (index !== -1) {
                state[action.payload.todolistId].splice(index, 1)
            }
        })
        .addCase(deleteAllTasksAC, (state, action) => {
            state[action.payload.todolistId] = []
        })
        .addCase(changeTaskStatusAC, (state, action) => {
            let task = state[action.payload.todolistId].find(task =>
                task.id === action.payload.taskId)
            if (task) {
                task.isDone = action.payload.isDone
            }
        })
        .addCase(changeTaskTitleAC, (state, action) => {
            let task = state[action.payload.todolistId].find(task =>
                task.id === action.payload.taskId)
            if (task) {
                task.title = action.payload.title
            }
        })
})


