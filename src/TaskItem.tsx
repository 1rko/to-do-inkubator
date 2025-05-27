import {getListItemSx} from "@/Components/сreateItemForm/TodolistItem.styles.ts";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "@/Components/editableSpan/EditableSpan.tsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItem from "@mui/material/ListItem";
import {Todolist} from "@/model/todolists-reducer.ts";
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC, Task} from "@/model/tasks-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {ChangeEvent} from "react";

type Props = {
    task: Task
    todolist: Todolist
};
export const TaskItem = ({task, todolist} : Props) => {
    const dispatch = useAppDispatch()

    const changeTaskTitle = (title: string) => {
        dispatch(changeTaskTitleAC({todolistId: todolist.id, taskId: task.id, title}))
    }

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>, taskId: string) => {
        let newStatusValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC({todolistId: todolist.id, taskId, isDone: newStatusValue}))
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
    );
};