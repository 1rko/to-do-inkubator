import {FilterValues, Task, Todolist} from '../App.tsx'
import {Button} from './Button.tsx'
import {ChangeEvent} from "react";
import {useAutoAnimate} from '@formkit/auto-animate/react'
import './../App.css'
import {CreateItemForm} from "./сreateItemForm/CreateItemForm.tsx";

type Props = {
    todolist: Todolist
    tasks: Task[]
    deleteTask: (todolistId: string, taskId: string) => void
    deleteAllTasks: (todolistId: string) => void
    createTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, id: string, newStatusValue: boolean) => void
    changeFilter: (todolistId: string, filter: FilterValues) => void
    deleteTodolist: (todolistId: string) => void
    children?: React.ReactNode
}

export const TodolistItem: React.FC<Props> = ({
                                                  children,
                                                  /*title,*/
                                                  todolist,
                                                  tasks,
                                                  deleteTask,
                                                  deleteAllTasks,
                                                  createTask,
                                                  changeFilter,
                                                  changeTaskStatus,
                                                  deleteTodolist,
                                              }: Props) => {

    const changeFilterHandler = (filter: FilterValues) => {
        changeFilter(todolist.id, filter)
        /*setFilter(filter)*/
    }

    const createTaskHandler = (title:string) => {
            createTask(todolist.id, title)
    }

    const deleteTaskHandler = (taskId: string) => {
        deleteTask(todolist.id, taskId)
    }

    const deleteAllTasksHandler = () => {
        deleteAllTasks(todolist.id)
    }

    const getFilteredTasks = (tasks: Task[]): Task[] => {
        let filteredTasks: Task[] = []

        switch (todolist.filter) {
            case "ALL":
                filteredTasks = tasks
                break
            case "ACTIVE":
                filteredTasks = tasks.filter(task => !task.isDone)
                break
            case "COMPLETED":
                filteredTasks = tasks.filter(task => task.isDone)
                break
            case "FIRST3":
                filteredTasks = tasks.filter((task, index) => index < 3)
                break
        }
        return filteredTasks
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, taskId: string) => {
        let newStatusValue = e.currentTarget.checked
        changeTaskStatus(todolist.id, taskId, newStatusValue)
    }

    const deleteTodolistHandler = () => {
        deleteTodolist(todolist.id)
    }

    let renderedTasks = getFilteredTasks(tasks).map(task => {
        return (
            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                <input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={(e) => changeTaskStatusHandler(e, task.id)}
                />
                <span>
                    {task.title + ' '}
                </span>
                <Button
                    title={'x'}
                    onClick={() => deleteTaskHandler(task.id)}
                />
            </li>
        )
    })

    const [listRef] = useAutoAnimate<HTMLUListElement>()

    return (<>
            <div>
                <div className={'container'}>
                    <h3>{todolist.title}</h3>
                    <Button title={'x'} onClick={deleteTodolistHandler}/>
                </div>

                <CreateItemForm onCreateItem={createTaskHandler}/>

                {renderedTasks.length === 0 ? (
                    <p>Тасок нет</p>
                ) : (
                    <ul ref={listRef}>
                        {renderedTasks}
                    </ul>
                )}
                <div>
                    <Button
                        title={'All'}
                        onClick={() => changeFilterHandler('ALL')}
                        className={(todolist.filter === 'ALL') ? 'active-filter' : ''}
                    />
                    <Button
                        title={'Active'}
                        onClick={() => changeFilterHandler('ACTIVE')}
                        className={(todolist.filter === 'ACTIVE') ? 'active-filter' : ''}
                    />

                    <Button
                        title={'Completed'}
                        onClick={() => changeFilterHandler('COMPLETED')}
                        className={(todolist.filter === 'COMPLETED') ? 'active-filter' : ''}
                    />
                    <Button
                        title={'First 3 tasks'}
                        onClick={() => changeFilterHandler('FIRST3')}
                        className={(todolist.filter === 'FIRST3') ? 'active-filter' : ''}
                    />
                    <Button
                        title={'DELETE ALL TASKS'}
                        onClick={deleteAllTasksHandler}/>
                </div>
            </div>
            {children}
        </>
    )
}
