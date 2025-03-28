import {Button} from "./Button.tsx";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type TodolistItemPropsType = {
    title: string
    subTitle?: string
    description?: string
    tasks: TaskType[]
    date?: string
}

export const TodolistItem = ({title, tasks, date}: TodolistItemPropsType) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            {/*<h4>{subTitle}</h4>
            <p>{description}</p>*/}
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map(task =>
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                        </li>
                    )}
                    <div>{date}</div>
                </ul>)
            }
            <div>
                <Button title={'All'}/>
                <Button title={'Active'}/>
                <Button title={'Completed'}/>
            </div>
        </div>
    )
}