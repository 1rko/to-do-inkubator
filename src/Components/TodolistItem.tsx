import '../app/App.css'
import {CreateItemForm} from "./сreateItemForm/CreateItemForm.tsx";

import {containerSx} from "./сreateItemForm/TodolistItem.styles.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {createTaskAC} from "@/model/tasks-reducer.ts";
import {changeTodolistFilterAC, FilterValues, Todolist} from "@/model/todolists-reducer.ts";
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import {TodolistTitle} from "@/TodolistTitle.tsx";
import {Tasks} from "@/Tasks.tsx";

type Props = {
    todolist: Todolist
    children?: React.ReactNode
}

export const TodolistItem: React.FC<Props> = ({
                                                  children,
                                                  todolist,
                                              }: Props) => {


    const dispatch = useAppDispatch()

    const createTask = (title: string) => {
        dispatch(createTaskAC({todolistId: todolist.id, title}))
    }

    const changeFilter = (filter: FilterValues) => {
        dispatch(changeTodolistFilterAC({id: todolist.id, filter}))
    }

    // @ts-ignore
    return (<>
            <div>
                <TodolistTitle todolist={todolist}/>

                <CreateItemForm onCreateItem={createTask}/>

                <Tasks todolist={todolist}/>

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
