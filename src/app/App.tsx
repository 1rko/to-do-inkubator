import './App.css'
import {TodolistItem} from "../Components/TodolistItem.tsx";
import {useState} from "react";
import {CreateItemForm} from "../Components/сreateItemForm/CreateItemForm.tsx";

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import {containerSx} from '../Components/сreateItemForm/TodolistItem.styles.ts';
import {NavButton} from '../Components/NavButton.ts';
import {createTheme, ThemeProvider} from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC,
    } from "../model/todolists-reducer.ts";
import {
    changeTaskStatusAC,
    changeTaskTitleAC,
    createTaskAC,
    deleteAllTasksAC,
    deleteTaskAC,
    } from "../model/tasks-reducer.ts";
import {useAppDispatch} from "../common/hooks/useAppDispatch.ts";
import {useAppSelector} from "../common/hooks/useAppSelector.ts";
import {selectTasks} from "../model/tasks-selectors.ts";
import {selectTodolists} from "../model/todolists-selectors.ts";

type ThemeMode = 'dark' | 'light'

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValues = 'ALL' | 'ACTIVE' | 'COMPLETED' | 'FIRST3'

export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}

export type TaskState = {
    [key: string]: Task[]
}

//То же самое, что и export type TasksState = Record<string, Task[]>

export const App = () => {
    console.log('App rendered')
    const dispatch = useAppDispatch()
    const todolists = useAppSelector(selectTodolists)
    const tasks = useAppSelector(selectTasks)

    //Тема - стилизация
    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const changeMode = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#fd7c00',
            },
        },
    })

//TASKS
    const createTask = (todolistId: string, title: string) => {
        dispatch(createTaskAC({todolistId, title}))
    }

    const changeTaskStatus = (todolistId: string, taskId: string, newStatusValue: boolean) => {
        dispatch(changeTaskStatusAC({todolistId, taskId, isDone: newStatusValue}))
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC({todolistId, taskId, title}))
    }

    const deleteTask = (todolistId: string, taskId: string) => {
        dispatch(deleteTaskAC({todolistId, taskId}))
    }

    const deleteAllTasks = (todolistId: string) => {
        dispatch(deleteAllTasksAC({todolistId: todolistId}))
    }

//TODOLISTS
    const createTodolist = (title: string) => {
        dispatch(createTodolistAC(title))
    }

    const changeTodolistTitle = (todolistId: string, newValue: string) => {
        dispatch(changeTodolistTitleAC({id: todolistId, title: newValue}))
    }

    const deleteTodolist = (todolistId: string) => {
        dispatch(deleteTodolistAC({id: todolistId}))
    }

    const changeFilter = (todolistId: string, filter: FilterValues) => {
        dispatch(changeTodolistFilterAC({id: todolistId, filter}))
    }

    return (
        <div className={'app'}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <AppBar position="static" sx={{mb: '30px'}}>
                    <Toolbar>
                        <Container maxWidth={'lg'} sx={containerSx}>
                            <IconButton color="inherit">
                                <MenuIcon/>
                            </IconButton>
                            <div>
                                <NavButton color="inherit">Sign in</NavButton>
                                <NavButton color="inherit">Sign up</NavButton>
                                <NavButton color="inherit" background={theme.palette.primary.dark}>Faq</NavButton>
                                <Switch color={'default'} onChange={changeMode}/>
                            </div>
                        </Container>
                    </Toolbar>
                </AppBar>

                <Container maxWidth={'lg'}>
                    <Grid container>
                        <h3>Create Todolist</h3>
                        <CreateItemForm onCreateItem={createTodolist}/>
                    </Grid>
                    <Grid container spacing={4} sx={{mb: '30px'}}>
                        {todolists.map(todolist => (
                            <Paper key={todolist.id} elevation={10} sx={{p: '0 20px 20px 20px'}}>
                                <TodolistItem
                                    todolist={todolist}
                                    tasks={tasks[todolist.id]}
                                    deleteTask={deleteTask}
                                    deleteAllTasks={deleteAllTasks}
                                    createTask={createTask}
                                    changeTaskStatus={changeTaskStatus}
                                    changeTaskTitle={changeTaskTitle}
                                    changeFilter={changeFilter}
                                    deleteTodolist={deleteTodolist}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        ))}
                    </Grid>
                </Container>
            </ThemeProvider>
        </div>

    )
}