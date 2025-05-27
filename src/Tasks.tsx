import {useAutoAnimate} from "@formkit/auto-animate/react";

import {Todolist} from "@/model/todolists-reducer.ts";
import {Task} from "@/model/tasks-reducer.ts";
import List from "@mui/material/List";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTasks} from "@/model/tasks-selectors.ts";
import {TaskItem} from "@/TaskItem.tsx";

type Props = {
    todolist: Todolist
};

export const Tasks = ({todolist}: Props) => {

    const tasks = useAppSelector(selectTasks)

    const todolistTasks = tasks[todolist.id]

    const getFilteredTasks = (tasks: Task[]): Task[] => {
        let filteredTasks: Task[] = []

        switch (todolist.filter) {
            case "ALL":
                filteredTasks = tasks
                break
            case "ACTIVE":
                filteredTasks = tasks.filter(task => !task.isDone)
                break
            case "COMPLETED":
                filteredTasks = tasks.filter(task => task.isDone)
                break
        }
        return filteredTasks
    }

    const [listRef] = useAutoAnimate<HTMLUListElement>()
    return (
        <>
            {getFilteredTasks(todolistTasks).length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <List ref={listRef}>
                    {getFilteredTasks(todolistTasks).map(task => {
                        return (
                            <TaskItem
                                key={task.id}
                                task={task}
                                todolist={todolist}
                            />
                        )
                    })}
                </List>
            )}
        </>
    );
};