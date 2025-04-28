import './App.css'
import {TodolistItem} from "./Components/TodolistItem.tsx";
import {useState} from "react";
import {v1} from "uuid";
import {CreateItemForm} from "./Components/сreateItemForm/CreateItemForm.tsx";

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValues = 'ALL' | 'ACTIVE' | 'COMPLETED' | 'FIRST3'

export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}

export type TaskState = {
    [key: string]: Task[]
}

//То же самое, что и export type TasksState = Record<string, Task[]>


export const App = () => {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<Todolist[]>([
        {id: todolistId1, title: 'What to learn', filter: 'ALL'},
        {id: todolistId2, title: 'What to buy', filter: 'ALL'},
    ])

    const [tasks, setTasks] = useState<TaskState>({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
    })

    const deleteTask = (todolistId: string, taskId: string) => {

        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)
        })
    }

    const deleteAllTasks = (todolistId: string) => {
        setTasks({...tasks, [todolistId]: []})
    }

    const createTask = (todolistId: string, title: string) => {
        let newTask = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks({
            ...tasks,
            [todolistId]: [newTask, ...tasks[todolistId]]
        })
    }

    const createTodolist = (title: string) => {
        let newTodolist: Todolist = {
            id: v1(),
            title: title,
            filter: 'ALL'
        }

        setTodolists([...todolists, newTodolist])
        setTasks({
            ...tasks,
            [newTodolist.id]: []
        })
    }

    const changeFilter = (todolistId: string, filter: FilterValues) => {
        let changedTodolists = todolists.map(tdl => {
            return tdl.id === todolistId ? {...tdl, filter} : tdl
        })
        setTodolists([...changedTodolists])
    }

    const changeTaskStatus = (todolistId: string, taskId: string, newStatusValue: boolean) => {
        let changedTasks: Task[] = tasks[todolistId].map(t => {
            return t.id === taskId ? {...t, isDone: newStatusValue} : t
        })
        setTasks({...tasks, [todolistId]: changedTasks})
    }

    const deleteTodolist = (todolistId: string) => {
        setTodolists([...todolists.filter(t => t.id !== todolistId)])
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    return (
        <div className={'app'}>
            <div>
                <span>Create Todolist</span>
                <CreateItemForm onCreateItem={createTodolist}/>
            </div>

            {todolists.map(todolist => (
                <TodolistItem key={todolist.id}
                              todolist={todolist}
                              tasks={tasks[todolist.id]}
                              deleteTask={deleteTask}
                              deleteAllTasks={deleteAllTasks}
                              createTask={createTask}
                              changeTaskStatus={changeTaskStatus}
                              changeFilter={changeFilter}
                              deleteTodolist={deleteTodolist}
                />
            ))}
        </div>
    )
}