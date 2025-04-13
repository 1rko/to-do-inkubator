import type {TaskType} from '../App.tsx'
import {Button} from './Button.tsx'
import {ChangeEvent, useState, KeyboardEvent} from "react";
import {useAutoAnimate} from '@formkit/auto-animate/react'
import {FullInput} from "./FullInput.tsx";
import './../App.css'

type Props = {
    title: string
    tasks: TaskType[]
    deleteTask: (id: string) => void
    deleteAllTasks: () => void
    createButtonClick: (title: string) => void
    changeTaskStatus: (id: string, newStatusValue: boolean) => void

    children?: React.ReactNode
}

type FilterType = 'ALL' | 'ACTIVE' | 'COMPLETED' | 'FIRST3'

type Error = string | null

export const TodolistItem: React.FC<Props> = ({
                                                  children,
                                                  title,
                                                  tasks,
                                                  deleteTask,
                                                  deleteAllTasks,
                                                  createButtonClick,
                                                  changeTaskStatus: changeTaskStatus
                                              }: Props) => {

    const [taskTitle, setTaskTitle] = useState('')
    const [filter, setFilter] = useState('ALL' as FilterType)
    const [error, setError] = useState<Error>(null)

    const changeFilterHandler = (filter: FilterType) => {
        setFilter(filter)
    }

    const createTaskHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle.trim() !== '') {
            createButtonClick(trimmedTitle)
            setTaskTitle('')
        } else {
            setError('Task title is required')
        }
    }

    const createTaskOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            createTaskHandler()
        }
    }

    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
        setError(null)
    }

    const deleteTaskHandler = (taskId: string) => {
        deleteTask(taskId)
    }

    const deleteAllTasksHandler = () => {
        deleteAllTasks()
    }

    const getFilteredTasks = (tasks: TaskType[]): TaskType[] => {
        let filteredTasks: TaskType[] = []

        switch (filter) {
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
        changeTaskStatus(taskId, newStatusValue)
    }

    let renderedTasks = getFilteredTasks(tasks).map(task => {
        return (
            <li key={task.id} className={task.isDone?'is-done':''}>
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
                <h3>{title}</h3>
                <FullInput value={taskTitle}
                           onChangeInput={changeTaskTitleHandler}
                           onKeyDownInput={createTaskOnEnterHandler}
                           onButtonClick={createTaskHandler}
                           error={error}
                />
                {error && <span className={"error-message"}>{error}</span>}

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
                        className={(filter === 'ALL') ? 'active-filter' : ''}
                    />
                    <Button
                        title={'Active'}
                        onClick={() => changeFilterHandler('ACTIVE')}
                        className={(filter === 'ACTIVE') ? 'active-filter' : ''}
                    />

                    <Button
                        title={'Completed'}
                        onClick={() => changeFilterHandler('COMPLETED')}
                        className={(filter === 'COMPLETED') ? 'active-filter' : ''}
                    />
                    <Button
                        title={'First 3 tasks'}
                        onClick={() => changeFilterHandler('FIRST3')}
                        className={(filter === 'FIRST3') ? 'active-filter' : ''}
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
