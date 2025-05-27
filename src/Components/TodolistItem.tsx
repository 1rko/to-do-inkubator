import {ChangeEvent} from "react";
import {useAutoAnimate} from '@formkit/auto-animate/react'
import '../app/App.css'
import {CreateItemForm} from "./сreateItemForm/CreateItemForm.tsx";
import {EditableSpan} from "./editableSpan/EditableSpan.tsx";

import {containerSx, getListItemSx} from "./сreateItemForm/TodolistItem.styles.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTasks} from "@/model/tasks-selectors.ts";
import {changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC, Task} from "@/model/tasks-reducer.ts";
import {changeTodolistFilterAC, FilterValues, Todolist} from "@/model/todolists-reducer.ts";

import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem'
import Box from '@mui/material/Box'
import {TodolistTitle} from "@/TodolistTitle.tsx";

type Props = {
    todolist: Todolist
    children?: React.ReactNode
}

export const TodolistItem: React.FC<Props> = ({
                                                  children,
                                                  todolist,
                                              }: Props) => {


    const dispatch = useAppDispatch()

    const tasks = useAppSelector(selectTasks)

    const todolistTasks = tasks[todolist.id]

   /* const deleteTodolist = () => {
        dispatch(deleteTodolistAC({id: todolist.id}))
    }

    const changeTodolistTitle = (newValue: string) => {
        dispatch(changeTodolistTitleAC({id: todolist.id, title: newValue}))
    }*/

    const createTask = (title: string) => {
        dispatch(createTaskAC({todolistId: todolist.id, title}))
    }

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>, taskId: string) => {
        let newStatusValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC({todolistId: todolist.id, taskId, isDone: newStatusValue}))
    }

    const changeFilter = (filter: FilterValues) => {
        dispatch(changeTodolistFilterAC({id: todolist.id, filter}))
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

    let renderedTasks = getFilteredTasks(todolistTasks).map(task => {

        const changeTaskTitle = (title: string) => {
            dispatch(changeTaskTitleAC({todolistId: todolist.id, taskId: task.id, title}))
        }

        const deleteOneTask = () => {
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
                    onChange={(e) => changeTaskStatus(e, task.id)}
                    inputProps={{'aria-label': 'controlled'}}
                    size={'small'}
                />
                <EditableSpan
                    value={task.title}
                    onChange={changeTaskTitle}
                />
                <IconButton onClick={deleteOneTask}>
                    <DeleteIcon/>
                </IconButton>
            </ListItem>
        )
    })

    const [listRef] = useAutoAnimate<HTMLUListElement>()

    // @ts-ignore
    return (<>
            <div>
                <TodolistTitle todolist={todolist}/>

                <CreateItemForm onCreateItem={createTask}/>

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
                            onClick={() => changeFilter('ALL')}
                            sx={{m: '0 3px'}}
                    >
                        All
                    </Button>
                    <Button variant={todolist.filter === 'ACTIVE' ? 'outlined' : 'text'}
                            color={'primary'}
                            onClick={() => changeFilter('ACTIVE')}
                            sx={{m: '0 3px'}}>
                        ACTIVE
                    </Button>
                    <Button variant={todolist.filter === 'COMPLETED' ? 'outlined' : 'text'}
                            color={'secondary'}
                            onClick={() => changeFilter('COMPLETED')}
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
