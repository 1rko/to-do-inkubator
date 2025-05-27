import {CreateItemForm} from "@/Components/сreateItemForm/CreateItemForm.tsx";

import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";

import {createTodolistAC,} from "@/model/todolists-reducer.ts";

import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import {Todolists} from "@/Todolists.tsx";

export const Main = () => {
    const dispatch = useAppDispatch()

    const createTodolist = (title: string) => {
        dispatch(createTodolistAC(title))
    }

    return (
        <Container maxWidth={'lg'}>
            <Grid container>
                <h3>Create Todolist</h3>
                <CreateItemForm onCreateItem={createTodolist}/>
            </Grid>
            <Grid container spacing={4} sx={{mb: '30px'}}>
                <Todolists/>
            </Grid>
        </Container>
    );
};