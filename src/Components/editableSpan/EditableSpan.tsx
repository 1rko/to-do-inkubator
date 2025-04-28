import {ChangeEvent, type KeyboardEvent, useState} from "react";

type Props = {
    value: string
    onChange: (newValue: string) => void
}

export const EditableSpan = (props: Props) => {
    const {
        value,
        onChange
    } = props
    const [isEditMode, setIsEditMode] = useState(false)
    const [title, setTitle] = useState(value)

    const turnOnEditModeHandler = () => {
        setIsEditMode(true)
    }

    const turnOffEditModeHandler = () => {
        setIsEditMode(false)
        onChange(title)
    }

    const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onSaveWithEnterPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setIsEditMode(false)
            onChange(title)
        }
    }

    return (
        <>
            {isEditMode ?
                <input
                    autoFocus
                    value={title}
                    onChange={changeTitleHandler}
                    onBlur={turnOffEditModeHandler}
                    onKeyDown={onSaveWithEnterPressHandler}
                /> :
                <span
                    onDoubleClick={turnOnEditModeHandler}
                >
                    {value}
                </span>
            }
        </>
    );
};
