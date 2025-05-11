import {ChangeEvent, KeyboardEvent} from "react";
import '../App.css'
import TextField from "@mui/material/TextField";

import AddBoxIcon from '@mui/icons-material/AddBox'
import IconButton from '@mui/material/IconButton'

type Props = {
    value: string
    onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void
    onKeyDownInput: (e: KeyboardEvent<HTMLInputElement>) => void
    onButtonClick: () => void
    buttonTitle: string
    error?: string | null
    buttonClassName?: string
}

export const FullInput = (props: Props) => {
    const {
        value,
        onChangeInput,
        onKeyDownInput,
        onButtonClick,
        error,
    } = props
    return (
        <div>
            <TextField label={'Enter a title'}
                       variant={'outlined'}
                       value={value}
                       size={'small'}
                       onChange={onChangeInput}
                       onKeyDown={onKeyDownInput}
                       error={!!error}
                       helperText={error}
                       autoFocus/>

            <IconButton onClick={onButtonClick} color={'primary'}>
                <AddBoxIcon />
            </IconButton>
        </div>
    );
};
