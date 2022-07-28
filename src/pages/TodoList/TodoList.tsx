import React from "react";

import {Page} from "../../components/Page/Page";
import {useTodo} from "../../store/todo/todo";

const todoListMeta = 'Task list';
const TodoList = (): JSX.Element => {
    const { todoList, createTodoItem, editTodoItemText, editTodoItemIsDone, removeTodoItem } = useTodo();
    return (
        <Page description={todoListMeta} keywords={todoListMeta} title={todoListMeta}>
            <div className="forsta-logo" />
            <p>Your task list: </p>
            <div>
                <button onClick={() => createTodoItem()}>New task</button>
            </div>
            {todoList.map((todoItem) => (
                <div key={todoItem.id}>
                    <input
                        type="checkbox"
                        name="isDone"
                        checked={todoItem.isDone}
                        onChange={(e) => editTodoItemIsDone({ id: todoItem.id, isDone: e.target.checked })}
                    />
                    <input
                        autoFocus
                        name="text"
                        placeholder={todoItem.isDone ? "" : "Type your task here"}
                        value={todoItem.text}
                        disabled={todoItem.isDone}
                        style={{textDecoration: todoItem.isDone ? 'line-through' : 'none' }}
                        onChange={(e) => editTodoItemText({ id: todoItem.id, text: e.target.value })}
                    />
                    <button onClick={() => removeTodoItem({ id: todoItem.id })}>Delete</button>
                </div>
            ))}
        </Page>
    );
};
export default TodoList;