import {FilterValues, Task, Todolist} from '../App.tsx'
import {ChangeEvent} from "react";
import {useAutoAnimate} from '@formkit/auto-animate/react'
import './../App.css'
import {CreateItemForm} from "./сreateItemForm/CreateItemForm.tsx";
import {EditableSpan} from "./editableSpan/EditableSpan.tsx";

import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem'
import Box from '@mui/material/Box'
import {containerSx, getListItemSx} from "./сreateItemForm/TodolistItem.styles.ts";

type Props = {
    todolist: Todolist
    tasks: Task[]
    deleteTask: (todolistId: string, taskId: string) => void
    deleteAllTasks: (todolistId: string) => void
    createTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, id: string, newStatusValue: boolean) => void
    changeTaskTitle: (todolistId: string, id: string, newValue: string) => void
    changeFilter: (todolistId: string, filter: FilterValues) => void
    deleteTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newValue: string) => void
    children?: React.ReactNode
}

export const TodolistItem: React.FC<Props> = ({
                                                  children,

                                                  todolist,
                                                  tasks,
                                                  deleteTask,
                                                  deleteAllTasks,
                                                  createTask,
                                                  changeFilter,
                                                  changeTaskStatus,
                                                  deleteTodolist,
                                                  changeTaskTitle,
                                                  changeTodolistTitle
                                              }: Props) => {

    const changeFilterHandler = (filter: FilterValues) => {
        changeFilter(todolist.id, filter)
    }

    const createTaskHandler = (title: string) => {
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

    const changeTodolistHandler = (newTitle: string) => {
        changeTodolistTitle(todolist.id, newTitle)
    }

    let renderedTasks = getFilteredTasks(tasks).map(task => {

        const changeTaskTitleHandler = (title: string) => {
            changeTaskTitle(todolist.id, task.id, title)
        }

        const deleteOneTaskHandler = () => {
            deleteTaskHandler(task.id)
        }

        return (
            <ListItem
                key={task.id}
                sx={getListItemSx(task.isDone)}
                disablePadding
            >
                <Checkbox
                    checked={task.isDone}
                    onChange={(e) => changeTaskStatusHandler(e, task.id)}
                    inputProps={{'aria-label': 'controlled'}}
                    size={'small'}
                />
                {/*<input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={(e) => changeTaskStatusHandler(e, task.id)}
                />*/}
                <EditableSpan
                    value={task.title}
                    onChange={changeTaskTitleHandler}
                />
                <IconButton onClick={deleteOneTaskHandler}>
                    <DeleteIcon/>
                </IconButton>
            </ListItem>
        )
    })

    const [listRef] = useAutoAnimate<HTMLUListElement>()

    // @ts-ignore
    return (<>
            <div>
                <div className={'container'}>
                    <h3>
                        <EditableSpan value={todolist.title} onChange={changeTodolistHandler}/>
                    </h3>
                    <IconButton onClick={deleteTodolistHandler}>
                        <DeleteIcon/>
                    </IconButton>
                </div>

                <CreateItemForm onCreateItem={createTaskHandler}/>

                {renderedTasks.length === 0 ? (
                    <p>Тасок нет</p>
                ) : (
                    <List ref={listRef}>
                        {renderedTasks}
                    </List>
                )}
                <Box sx={containerSx}>
                    <Button variant={todolist.filter === 'ALL' ? 'outlined' : 'text'}
                            color={'inherit'}
                            onClick={() => changeFilterHandler('ALL')}
                            sx={{m: '0 3px'}}
                    >
                        All
                    </Button>
                    <Button variant={todolist.filter === 'ACTIVE' ? 'outlined' : 'text'}
                            color={'primary'}
                            onClick={() => changeFilterHandler('ACTIVE')}
                            sx={{m: '0 3px'}}>
                        ACTIVE
                    </Button>
                    <Button variant={todolist.filter === 'COMPLETED' ? 'outlined' : 'text'}
                            color={'secondary'}
                            onClick={() => changeFilterHandler('COMPLETED')}
                            sx={{m: '0 3px'}}>
                        COMPLETED
                    </Button>
                    {/* <Button variant={todolist.filter === 'FIRST3' ? 'outlined' : 'text'}
                            color={'success'}
                            onClick={() => changeFilterHandler('FIRST3')}
                            sx={{m: '0 3px'}}>
                        First 3 tasks
                    </Button>
                    <Button variant={'contained'}
                            color={'error'}
                            onClick={deleteAllTasksHandler}
                            sx={{m: '0 3px'}}>
                        DELETE ALL TASKS
                    </Button>*/}
                </Box>
            </div>
            {
                children
            }
        </>
    )
}
