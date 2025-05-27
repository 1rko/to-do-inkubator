import {Header} from "@/common/common/components/Header.tsx";
import {Main} from "@/app/Main.tsx";

import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {getTheme} from "@/common/theme/theme.ts";
import {selectThemeMode} from "@/app/app-selectors.ts";

import './App.css'
import {ThemeProvider} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'


export const App = () => {
    const themeMode = useAppSelector(selectThemeMode)

    const theme = getTheme(themeMode)

    return (

        <ThemeProvider theme={theme}>
            <div className={'app'}>
                <CssBaseline/>
                <Header/>
                <Main/>
            </div>
        </ThemeProvider>
    )
}