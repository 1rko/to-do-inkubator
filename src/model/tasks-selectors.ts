import type {TaskState} from '../app/App'
import type { RootState } from '../app/store'

export const selectTasks = (state: RootState): TaskState  => state.tasks