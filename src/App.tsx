import './App.css'
import {TodolistItem} from "./Components/TodolistItem.tsx";
import {useReducer, useState} from "react";
import {v1} from "uuid";
import {CreateItemForm} from "./Components/сreateItemForm/CreateItemForm.tsx";

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import {containerSx} from './Components/сreateItemForm/TodolistItem.styles.ts';
import {NavButton} from './Components/NavButton.ts';
import {createTheme, ThemeProvider} from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import {
    changeFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC,
    todolistsReducer
} from "./model/todolists-reducer.ts";

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

    const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [])

    const [tasks, setTasks] = useState<TaskState>({})

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
    /////////

    const deleteTask = (todolistId: string, taskId: string) => {

        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)
        })
    }

    const deleteAllTasks = (todolistId: string) => {
        setTasks({...tasks, [todolistId]: []})
    }

    const createTask = (todolistId: string, title: string) => {
        let newTask = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks({
            ...tasks,
            [todolistId]: [newTask, ...tasks[todolistId]]
        })
    }

    const createTodolist = (title: string) => {
        const action = createTodolistAC(title)
        dispatchToTodolists(action)
        setTasks({
            ...tasks,
            [action.payload.id]: []
        })
    }

    const changeFilter = (todolistId: string, filter: FilterValues) => {
        const action = changeFilterAC({id: todolistId, filter})
        dispatchToTodolists(action)
    }

    const changeTaskStatus = (todolistId: string, taskId: string, newStatusValue: boolean) => {
        let changedTask: Task[] = tasks[todolistId].map(t => {
            return t.id === taskId ? {...t, isDone: newStatusValue} : t
        })
        setTasks({...tasks, [todolistId]: changedTask})
    }

    const changeTaskTitle = (todolistId: string, taskId: string, newValue: string) => {
        let changedTask: Task[] = tasks[todolistId].map(t => {
            return t.id === taskId ? {...t, title: newValue} : t
        })
        setTasks({...tasks, [todolistId]: changedTask})
    }

    const changeTodolistTitle = (todolistId: string, newValue: string) => {
        const action = changeTodolistTitleAC({id: todolistId, title: newValue})
        dispatchToTodolists(action)
    }

    const deleteTodolist = (todolistId: string) => {
        const action = deleteTodolistAC(todolistId)
        dispatchToTodolists(action)
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