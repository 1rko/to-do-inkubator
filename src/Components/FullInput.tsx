import {Button} from "./Button.tsx";
import {ChangeEvent, KeyboardEvent} from "react";
import '../App.css'

type Props = {
    value: string
    onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void
    onKeyDownInput: (e: KeyboardEvent<HTMLInputElement>) => void
    onButtonClick: () => void
    error?: string | null
    className: string
}

export const FullInput = ({value, onChangeInput, onKeyDownInput, onButtonClick, error, className}: Props) => {
    return (
        <div>
            <input
                value={value}
                onChange={onChangeInput}
                onKeyDown={onKeyDownInput}
                className={error ? 'error': ''}
            />
            <Button
                title={'+'}
                onClick={onButtonClick}
                /*disabled={!value}*/
                className={className}
            />
        </div>
    );
};
