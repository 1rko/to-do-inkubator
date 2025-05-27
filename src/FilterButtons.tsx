import Box from "@mui/material/Box";
import {containerSx} from "@/Components/сreateItemForm/TodolistItem.styles.ts";
import Button from "@mui/material/Button";
import {changeTodolistFilterAC, FilterValues, Todolist} from "@/model/todolists-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";

type Props = {
    todolist: Todolist
};
export const FilterButtons = ({todolist}: Props) => {
    const dispatch = useAppDispatch()
    const changeFilter = (filter: FilterValues) => {
        dispatch(changeTodolistFilterAC({id: todolist.id, filter}))
    }
    return (
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
    );
};