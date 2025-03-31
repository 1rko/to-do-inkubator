import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";
import {useState} from "react";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const App = () => {
    const tasks1: TaskType[] = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'Redux', isDone: false},
        {id: 5, title: 'Typescript', isDone: false},
        {id: 6, title: 'RTK query', isDone: false},
    ]

    const tasks2: TaskType[] = [
        /*{id: 1, title: 'Hello world', isDone: true},
        {id: 2, title: 'I am Happy', isDone: false},
        {id: 3, title: 'Yo', isDone: false},*/
    ]

    const [tasks, setTasks] = useState(tasks1)

    const deleteTask = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id))
    }

    const deleteAllTasks = () => {
        setTasks([])
    }

    return (
        <div className={'app'}>
            <TodolistItem
                title="What to learn"
                tasks={tasks}
                deleteTask={deleteTask}
                deleteAllTasks={deleteAllTasks}
            />
            {/* <TodolistItem title="Songs" tasks={tasks2}/>
            <TodolistItem title="Books" tasks={tasks2}/>*/}
        </div>
    )
}