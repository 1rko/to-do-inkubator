import {Button} from "./Button.tsx";
import {ChangeEvent, KeyboardEvent} from "react";
import '../App.css'

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
        buttonTitle,
        error,
        buttonClassName
    } = props
    return (
        <div>
            <input
                value={value}
                onChange={onChangeInput}
                onKeyDown={onKeyDownInput}
                className={error ? 'error' : ''}
            />
            {error && <span className={"error-message"}>{error}</span>}
            <Button
                title={buttonTitle}
                onClick={onButtonClick}
                disabled={!value}
                className={buttonClassName}
            />
        </div>
    );
};
