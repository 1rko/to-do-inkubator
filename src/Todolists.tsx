import Paper from "@mui/material/Paper";
import {TodolistItem} from "@/Components/TodolistItem.tsx";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTodolists} from "@/model/todolists-selectors.ts";

import {changeTodolistTitleAC, deleteTodolistAC,} from "@/model/todolists-reducer.ts";


export const Todolists = () => {
    const dispatch = useAppDispatch()
    const todolists = useAppSelector(selectTodolists)

    const changeTodolistTitle = (todolistId: string, newValue: string) => {
        dispatch(changeTodolistTitleAC({id: todolistId, title: newValue}))
    }

    const deleteTodolist = (todolistId: string) => {
        dispatch(deleteTodolistAC({id: todolistId}))
    }

    return (
        <>
            {todolists.map(todolist => (
                <Paper key={todolist.id} elevation={10} sx={{p: '0 20px 20px 20px'}}>
                    <TodolistItem
                        todolist={todolist}
                        deleteTodolist={deleteTodolist}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                </Paper>
            ))}
        </>
    );
};