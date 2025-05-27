import {EditableSpan} from "@/Components/editableSpan/EditableSpan.tsx";

import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import {changeTodolistTitleAC, deleteTodolistAC, Todolist} from "@/model/todolists-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";

type Props = {
    todolist: Todolist
};

export const TodolistTitle = ({
                                  todolist
                              }: Props) => {
    const dispatch = useAppDispatch()

    const deleteTodolist = () => {
        dispatch(deleteTodolistAC({id: todolist.id}))
    }

    const changeTodolistTitle = (newValue: string) => {
        dispatch(changeTodolistTitleAC({id: todolist.id, title: newValue}))
    }
    return (
        <div className={'container'}>
            <h3>
                <EditableSpan value={todolist.title} onChange={changeTodolistTitle}/>
            </h3>
            <IconButton onClick={deleteTodolist}>
                <DeleteIcon/>
            </IconButton>
        </div>
    );
};