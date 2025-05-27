import '../app/App.css'
import {CreateItemForm} from "./сreateItemForm/CreateItemForm.tsx";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {createTaskAC} from "@/model/tasks-reducer.ts";
import {Todolist} from "@/model/todolists-reducer.ts";
import {TodolistTitle} from "@/TodolistTitle.tsx";
import {Tasks} from "@/Tasks.tsx";
import {FilterButtons} from "@/FilterButtons.tsx";

type Props = {
    todolist: Todolist
    children?: React.ReactNode
}

export const TodolistItem: React.FC<Props> = ({
                                                  children,
                                                  todolist,
                                              }: Props) => {

    const dispatch = useAppDispatch()

    const createTask = (title: string) => {
        dispatch(createTaskAC({todolistId: todolist.id, title}))
    }
    // @ts-ignore
    return (<>
            <div>
                <TodolistTitle todolist={todolist}/>
                <CreateItemForm onCreateItem={createTask}/>
                <Tasks todolist={todolist}/>
                <FilterButtons todolist={todolist}/>
            </div>
            {
                children
            }
        </>
    )
}
