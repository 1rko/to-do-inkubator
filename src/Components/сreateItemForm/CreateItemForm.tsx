import {FullInput} from "../FullInput.tsx";
import {type ChangeEvent, type KeyboardEvent, useState} from "react";

type Props = {
    onCreateItem: (title: string) => void
}

export const CreateItemForm = (props: Props) => {
    const {onCreateItem} = props
    const [itemTitle, setItemTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const changeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(e.currentTarget.value)
        setError(null)
    }

    const createItemHandler = () => {
        const trimmedTitle = itemTitle.trim()
        if (trimmedTitle !== '') {
            onCreateItem(trimmedTitle)
            setItemTitle('')
        } else {
            setError('Title is required')
        }
    }

    const createItemOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter'){
            createItemHandler()
        }
    }

    return (
        <FullInput
            value={itemTitle}
            onChangeInput={changeInputHandler}
            onKeyDownInput={createItemOnEnterHandler}
            buttonTitle={'+'}
            onButtonClick={createItemHandler}
            error={error}
        />
    );
};
