import type {TaskType} from './App'
import {Button} from './Button'
import {useState} from "react";

type Props = {
    title: string
    tasks: TaskType[]
    deleteTask: (id: number) => void
    deleteAllTasks: () => void
}

type FilterType = 'ALL' | 'ACTIVE' | 'COMPLETED' | 'FIRST3'

export const TodolistItem = ({title, tasks, deleteTask, deleteAllTasks}: Props) => {

    const [filter, setFilter] = useState('ALL' as FilterType)

    const changeFilter = (filter: FilterType) => {
        setFilter(filter)
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

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button title={'+'} onClickHandler={() => {
                }}/>
            </div>
            {filteredTasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {filteredTasks.map(task => {
                        return (
                            <li key={task.id}>
                                <input
                                    type="checkbox"
                                    checked={task.isDone}
                                />
                                <span>{task.title + '  '}</span>
                                <Button
                                    title={'x'}
                                    onClickHandler={() => deleteTask(task.id)}
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
    )
}
