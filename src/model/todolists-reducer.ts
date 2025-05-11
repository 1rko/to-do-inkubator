import {FilterValues, Todolist} from "../App.tsx";
import {v1} from "uuid";

type Actions = DeleteTodolistAction | CreateTodolistAction | ChangeTodolistTitleAction | changeFilterAction

export const deleteTodolistAC = (id: string) => {
    return {type: 'delete_todolist', payload: {id}} as const
}

export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>

export const createTodolistAC = (title: string) => {
    return {type: 'create_todolist', payload: {id: v1(), title}} as const
}

export type CreateTodolistAction = ReturnType<typeof createTodolistAC>

export const changeTodolistTitleAC = (payload: { id: string, title: string }) => {
    const {id, title} = payload
    return {type: 'changeTitle_todolist', payload: {id, title}} as const
}

export type ChangeTodolistTitleAction = ReturnType<typeof changeTodolistTitleAC>

export const changeFilterAC = (payload: { id: string, filter: FilterValues }) => {
    const {id, filter} = payload
    return {type: 'changeFilter_todolist', payload: {id, filter}} as const
}

export type changeFilterAction = ReturnType<typeof changeFilterAC>

const initialState: Todolist[] = []

export const todolistsReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {
    switch (action.type) {
        case "delete_todolist": {
            return [...state.filter(t => t.id !== action.payload.id)]
        }

        case "create_todolist": {
            return [
                ...state,
                {
                    id: action.payload.id,
                    title: action.payload.title,
                    filter: "ALL"
                },
            ]
        }

        case 'changeTitle_todolist' : {
            let changedTodolists: Todolist[] = state.map(t => {
                return t.id === action.payload.id ? {...t, title: action.payload.title,} : t
            })
            return [...changedTodolists]
        }

        case "changeFilter_todolist": {
            let changedTodolists = state.map(tdl => {
                return tdl.id === action.payload.id ? {...tdl, filter: action.payload.filter} : tdl
            })
            return [...changedTodolists]
        }

        default:
            return state
    }
}

