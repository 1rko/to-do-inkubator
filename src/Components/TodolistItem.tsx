import {ChangeEvent} from "react";
import {useAutoAnimate} from '@formkit/auto-animate/react'
import '../app/App.css'
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
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTasks} from "@/model/tasks-selectors.ts";
import {changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC, Task} from "@/model/tasks-reducer.ts";
import {changeTodolistFilterAC, FilterValues, Todolist} from "@/model/todolists-reducer.ts";

type Props = {
    todolist: Todolist
    deleteTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newValue: string) => void
    children?: React.ReactNode
}

export const TodolistItem: React.FC<Props> = ({
                                                  children,
                                                  todolist,
                                                  deleteTodolist,
                                                  changeTodolistTitle
                                              }: Props) => {


    const dispatch = useAppDispatch()

    const tasks = useAppSelector(selectTasks)

    const todolistTasks = tasks[todolist.id]

    const changeFilterHandler = (filter: FilterValues) => {
        dispatch(changeTodolistFilterAC({id: todolist.id, filter}))
    }

    const createTaskHandler = (title: string) => {
        dispatch(createTaskAC({todolistId: todolist.id, title}))
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
        }
        return filteredTasks
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, taskId: string) => {
        let newStatusValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC({todolistId: todolist.id, taskId, isDone: newStatusValue}))
    }

    const deleteTodolistHandler = () => {
        deleteTodolist(todolist.id)
    }

    const changeTodolistHandler = (newTitle: string) => {
        changeTodolistTitle(todolist.id, newTitle)
    }

    let renderedTasks = getFilteredTasks(todolistTasks).map(task => {

        const changeTaskTitleHandler = (title: string) => {
            dispatch(changeTaskTitleAC({todolistId: todolist.id, taskId: task.id, title}))
        }

        const deleteOneTaskHandler = () => {
            dispatch(deleteTaskAC({todolistId: todolist.id, taskId: task.id}))
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
                </Box>
            </div>
            {
                children
            }
        </>
    )
}
