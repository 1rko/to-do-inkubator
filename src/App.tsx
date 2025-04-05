import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";
import {useState} from "react";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const App = () => {
    const tasks1: TaskType[] = [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'Typescript', isDone: false},
        {id: v1(), title: 'RTK query', isDone: false},
    ]

    const [tasks, setTasks] = useState(tasks1)

    const deleteTask = (id: string) => {
        setTasks(tasks.filter(task => task.id !== id))
    }

    const deleteAllTasks = () => {
        setTasks([])
    }

    const createTask = (title: string) => {
        let newTask = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks([newTask, ...tasks])
    }

    return (
        <div className={'app'}>
            <TodolistItem
                title="What to learn"
                tasks={tasks}
                deleteTask={deleteTask}
                deleteAllTasks={deleteAllTasks}
                createButtonClick={createTask}
            />
            <TodolistItem
                title="asfsdf"
                tasks={tasks}
                deleteTask={deleteTask}
                deleteAllTasks={deleteAllTasks}
                createButtonClick={createTask}
            >
                <div>
                    <div>Many intresting information</div>
                </div>
            </TodolistItem>
            {/* <TodolistItem title="Songs" tasks={tasks2}/>
            <TodolistItem title="Books" tasks={tasks2}/>*/}
        </div>
    )
}