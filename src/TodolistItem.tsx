import type {TaskType} from './App'
import {Button} from './Button'
import {ChangeEvent, useState, KeyboardEvent} from "react";
//import { useAutoAnimate } from '@formkit/auto-animate/react'

type Props = {
    title: string
    tasks: TaskType[]
    deleteTask: (id: string) => void
    deleteAllTasks: () => void
    createButtonClick: (title: string) => void

    children?: React.ReactNode
}

type FilterType = 'ALL' | 'ACTIVE' | 'COMPLETED' | 'FIRST3'

export const TodolistItem: React.FC<Props> = ({
                                                  children,
                                                  title,
                                                  tasks,
                                                  deleteTask,
                                                  deleteAllTasks,
                                                  createButtonClick
                                              }: Props) => {

    const [filter, setFilter] = useState('ALL' as FilterType)

    const changeFilter = (filter: FilterType) => {
        setFilter(filter)
    }

    const [taskTitle, setTaskTitle] = useState('')

    const createButtonClickHandler = () => {
        if (taskTitle) {
            createButtonClick(taskTitle)
            setTaskTitle('')
        }
    }

    const createTaskOnEnterHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            createButtonClickHandler()
        }
    }

    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
    }

    let filteredTasks = tasks

    if (filter === "ACTIVE") {
        filteredTasks = tasks.filter(task => !task.isDone)
    }
    if (filter === "COMPLETED") {
        filteredTasks = tasks.filter(task => task.isDone)
    }
    if (filter === "FIRST3") {
        filteredTasks = tasks.filter((task, index) => index < 3)
    }

    //const [listRef] = useAutoAnimate<HTMLUListElement>()

    return (<>
            <div>
                <h3>{title}</h3>
                <div>
                    <input
                        value={taskTitle}
                        onChange={changeTaskTitleHandler}
                        onKeyDown={createTaskOnEnterHandler}
                    />
                    <Button
                        title={'+'}
                        onClickHandler={createButtonClickHandler}
                    />
                </div>
                {filteredTasks.length === 0 ? (
                    <p>Тасок нет</p>
                ) : (
                    <ul /*ref={listRef}*/>
                        {filteredTasks.map(task => {
                            const deleteTaskHandler = () => {
                                deleteTask(task.id)
                            }
                            return (
                                <li key={task.id}>
                                    <input
                                        type="checkbox"
                                        checked={task.isDone}
                                    />
                                    <span>{task.title + '  '}</span>
                                    <Button
                                        title={'x'}
                                        onClickHandler={deleteTaskHandler}
                                    />
                                </li>
                            )
                        })}
                    </ul>
                )}
                <div>
                    <Button
                        title={'All'}
                        onClickHandler={() => changeFilter('ALL')}
                    />
                    <Button
                        title={'Active'}
                        onClickHandler={() => changeFilter('ACTIVE')}/>
                    <Button
                        title={'Completed'}
                        onClickHandler={() => changeFilter('COMPLETED')}/>
                    <Button
                        title={'First 3 tasks'}
                        onClickHandler={() => changeFilter('FIRST3')}/>
                    <Button
                        title={'DELETE ALL TASKS'}
                        onClickHandler={() => deleteAllTasks()}/>
                </div>
            </div>
            {children}
        </>
    )
}
