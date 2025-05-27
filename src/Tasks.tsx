import {useAutoAnimate} from "@formkit/auto-animate/react";

import {EditableSpan} from "@/Components/editableSpan/EditableSpan.tsx";

import {Todolist} from "@/model/todolists-reducer.ts";
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC, Task} from "@/model/tasks-reducer.ts";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import {getListItemSx} from "@/Components/сreateItemForm/TodolistItem.styles.ts";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTasks} from "@/model/tasks-selectors.ts";
import {ChangeEvent} from "react";

type Props = {
    todolist: Todolist
};

export const Tasks = ({todolist} : Props) => {
    const dispatch = useAppDispatch()

    const tasks = useAppSelector(selectTasks)

    const todolistTasks = tasks[todolist.id]

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>, taskId: string) => {
        let newStatusValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC({todolistId: todolist.id, taskId, isDone: newStatusValue}))
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
    return (
        <>
            {renderedTasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <List ref={listRef}>
                    {renderedTasks}
                </List>
            )}
        </>
    );
};