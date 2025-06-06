import {beforeEach, expect, test} from 'vitest'
import type {Todolist, FilterValues} from '../app/App.tsx'
import {
    createTodolistAC,
    deleteTodolistAC,
    todolistsReducer,
    changeTodolistTitleAC,
    changeTodolistFilterAC
} from './todolists-reducer'
import {nanoid} from '@reduxjs/toolkit'

let todolistId1: string
let todolistId2: string
let startState: Todolist[]

beforeEach(() => {
    todolistId1 = nanoid()
    todolistId2 = nanoid()

    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'ALL'},
        {id: todolistId2, title: 'What to buy', filter: 'ALL'},
    ]
})

test('correct todolist should be deleted', () => {
    const endState = todolistsReducer(startState, deleteTodolistAC({id: todolistId1}))

    // 3. Проверка, что действие измененило state соответствующим образом
    // в массиве останется один тудулист
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be created', () => {

    // 2. Действие
    const title = 'New todolist'
    const endState = todolistsReducer(startState, createTodolistAC(title))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(title)
})

test('correct todolist should change its title', () => {
    const newTitle = 'New Title'
    const endState = todolistsReducer(startState, changeTodolistTitleAC({id: todolistId2, title: newTitle}))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTitle)
})

test('correct todolist should change its filter', () => {
    const filter: FilterValues = "COMPLETED"
    const endState = todolistsReducer(startState, changeTodolistFilterAC({id: todolistId2, filter: filter}))

    expect(endState[0].filter).toBe('ALL')
    expect(endState[1].filter).toBe(filter)
})