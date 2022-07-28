import {Action, createSlice, PayloadAction} from '@reduxjs/toolkit';
import { v4 } from 'uuid';
import {RootState, useAppDispatch, useAppSelector} from "../helpers";

type TodoItem = {
  id: string;
  text: string;
  doneAt: number;
  isDone: boolean;
  createdAt: number;
}
type TodoState = {
  todoMap: Record<string, TodoItem>;
};

type TodoName = string;
const todoSliceName: TodoName = 'todo';

type CreateTodoItemAction = Action;
type editTodoItemTextAction = PayloadAction<Pick<TodoItem, 'id' | 'text'>>;
type editTodoItemIsDoneAction = PayloadAction<Pick<TodoItem, 'id' | 'isDone'>>;
type RemoveTodoItemAction = PayloadAction<Pick<TodoItem, 'id'>>;
type TodoCaseReducers = {
  createTodoItem: (state: TodoState, action: CreateTodoItemAction) => void;
  editTodoItemText: (state: TodoState, action: editTodoItemTextAction) => void;
  editTodoItemIsDone: (state: TodoState, action: editTodoItemIsDoneAction) => void;
  removeTodoItem: (state: TodoState, action: RemoveTodoItemAction) => void;
};

export const todoSlice = createSlice<TodoState, TodoCaseReducers, TodoName>({
  name: todoSliceName,
  initialState: {
    todoMap: {},
  },
  reducers: {
    createTodoItem: (state: TodoState) => {
      const id = v4();

      state.todoMap[id] = {
        id,
        text: '',
        isDone: false,
        doneAt: 0,
        createdAt: Date.now()
      };
    },
    editTodoItemText: (state: TodoState, action: editTodoItemTextAction) => {
      const { id, text } = action.payload;
      state.todoMap[id].text = text;
    },
    editTodoItemIsDone: (state: TodoState, action: editTodoItemIsDoneAction) => {
      const { id, isDone } = action.payload;
      state.todoMap[id].isDone = isDone;
      state.todoMap[id].doneAt = isDone ? Date.now() : 0;
    },
    removeTodoItem: (state: TodoState, action: RemoveTodoItemAction) => {
      const { id } = action.payload;
      delete state.todoMap[id];
    }
  },
});

const { createTodoItem, editTodoItemText, editTodoItemIsDone, removeTodoItem } = todoSlice.actions;

export const useTodo = (): {
  todoList: Array<TodoItem>;

  createTodoItem: () => void;
  editTodoItemText: (payload: Pick<TodoItem, 'id' | 'text'>) => void;
  editTodoItemIsDone: (payload: Pick<TodoItem, 'id' | 'isDone'>) => void;
  removeTodoItem: (payload: Pick<TodoItem, 'id'>) => void;
} => {
  const dispatch = useAppDispatch();

  return {
    todoList: useAppSelector((state: RootState) => {
      // Group items
      let notDoneItems: Array<TodoItem> = [];
      let doneItems: Array<TodoItem> = [];
      Object.values(state.todo.todoMap).forEach(item => {
        if (item.isDone) {
          doneItems.push(item);
        } else {
          notDoneItems.push(item);
        }
      })

      // Sort items
      notDoneItems = notDoneItems.sort((a, b) => b.createdAt - a.createdAt)
      doneItems = doneItems.sort((a, b) => a.doneAt - b.doneAt)

      return notDoneItems.concat(doneItems);
    }),

    createTodoItem: () => {
      dispatch(createTodoItem());
    },
    editTodoItemText: (payload: Pick<TodoItem, 'id' | 'text'>) => {
      dispatch(editTodoItemText(payload));
    },
    editTodoItemIsDone: (payload: Pick<TodoItem, 'id' | 'isDone'>) => {
      dispatch(editTodoItemIsDone(payload));
    },
    removeTodoItem: (payload: Pick<TodoItem, 'id'>) => {
      dispatch(removeTodoItem(payload));
    },
  };
};
