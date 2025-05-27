import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import {containerSx} from "@/Components/сreateItemForm/TodolistItem.styles.ts";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {NavButton} from "@/Components/NavButton.ts";
import Switch from "@mui/material/Switch";
import AppBar from "@mui/material/AppBar";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectThemeMode} from "@/app/app-selectors.ts";
import {changeThemeModeAC} from "@/app/app-reducer.ts";
import {getTheme} from "@/common/theme/theme.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";

type Props = {

};
export const Header = (props: Props) => {
    const dispatch = useAppDispatch()

    //Тема - стилизация
    const themeMode  = useAppSelector(selectThemeMode)

    const theme = getTheme(themeMode)

    const changeMode = () => {
        dispatch(changeThemeModeAC({themeMode: themeMode === 'light' ? 'dark' : 'light'}))
    }
    return (
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
    );
};