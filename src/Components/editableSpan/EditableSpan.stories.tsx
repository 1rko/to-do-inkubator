import {useState} from "react";
import {EditableSpan} from "./EditableSpan.tsx";

export default {
    title: 'Components',
    component: EditableSpan,
};

export const BaseEditableSpan = () => {
    const [val, setVal] = useState('Editable Span')
    const changeHandler = (newValue: string) =>{
        setVal(newValue)
    }

    return (
        <EditableSpan value={val}
                      onChange={changeHandler}
        />
    )
}