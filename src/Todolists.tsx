import Paper from "@mui/material/Paper";
import {TodolistItem} from "@/Components/TodolistItem.tsx";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTodolists} from "@/model/todolists-selectors.ts";


export const Todolists = () => {
    const todolists = useAppSelector(selectTodolists)

    return (
        <>
            {todolists.map(todolist => (
                <Paper key={todolist.id} elevation={10} sx={{p: '0 20px 20px 20px'}}>
                    <TodolistItem
                        todolist={todolist}
                    />
                </Paper>
            ))}
        </>
    );
};