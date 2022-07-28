import React from "react";
import { Provider } from "react-redux";
import { renderHook, act } from '@testing-library/react-hooks'
import '@testing-library/jest-dom/extend-expect'
import {configureStore} from "@reduxjs/toolkit";

import {todoSlice, useTodo} from "./todo";

const Wrapper = ({children}: React.PropsWithChildren): JSX.Element => {
    const store = configureStore({
        middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
        reducer: {
            todo: todoSlice.reducer,
        },
    });

    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

describe("useTodo", () => {
    it("Initial state", async () => {
        const {result} = renderHook(() => useTodo(), {wrapper: Wrapper});
        expect(result.current.todoList).toEqual([]);
        expect(result.current.createTodoItem).toBeTruthy();
        expect(result.current.editTodoItemText).toBeTruthy();
        expect(result.current.editTodoItemIsDone).toBeTruthy();
        expect(result.current.removeTodoItem).toBeTruthy();
    });

    it("Should create empty item", async () => {
        const {result} = renderHook(() => useTodo(), {wrapper: Wrapper});

        act(() => {
            result.current.createTodoItem();
        })

        expect(result.current.todoList.length).toEqual(1);
        expect(result.current.todoList[0].id).toBeTruthy();
        expect(result.current.todoList[0].text).toEqual("");
        expect(result.current.todoList[0].doneAt).toEqual(0);
        expect(result.current.todoList[0].isDone).toEqual(false);
        expect(result.current.todoList[0].createdAt).toBeLessThanOrEqual(Date.now());
    });

    it("Should edit item text", async () => {
        const {result} = renderHook(() => useTodo(), {wrapper: Wrapper});

        act(() => {
            result.current.createTodoItem();
        })

        expect(result.current.todoList.length).toEqual(1);
        expect(result.current.todoList[0].text).toEqual("");

        act(() => {
            result.current.editTodoItemText({
                id: result.current.todoList[0].id,
                text: "test"
            });
        })

        expect(result.current.todoList.length).toEqual(1);
        expect(result.current.todoList[0].text).toEqual("test");
    });

    it("Should edit item isDone", async () => {
        const {result} = renderHook(() => useTodo(), {wrapper: Wrapper});

        act(() => {
            result.current.createTodoItem();
        })

        expect(result.current.todoList.length).toEqual(1);
        expect(result.current.todoList[0].doneAt).toEqual(0);
        expect(result.current.todoList[0].isDone).toEqual(false);

        act(() => {
            result.current.editTodoItemIsDone({
                id: result.current.todoList[0].id,
                isDone: true
            });
        })

        expect(result.current.todoList.length).toEqual(1);
        expect(result.current.todoList[0].doneAt).toBeLessThanOrEqual(Date.now());
        expect(result.current.todoList[0].isDone).toEqual(true);
    });

    it("Should remove item", async () => {
        const {result} = renderHook(() => useTodo(), {wrapper: Wrapper});

        act(() => {
            result.current.createTodoItem();
        })

        expect(result.current.todoList.length).toEqual(1);

        act(() => {
            result.current.removeTodoItem({
                id: result.current.todoList[0].id
            });
        })

        expect(result.current.todoList.length).toEqual(0);
    });

    it("Should list items in right order", async () => {
        const {result} = renderHook(() => useTodo(), {wrapper: Wrapper});

        for (let i = 0; i < 10; i++) {
            act(() => {
                result.current.createTodoItem();
            })
        }


        for (let i = 0; i < 5; i++) {
            act(() => {
                result.current.editTodoItemIsDone({
                    id: result.current.todoList[i].id,
                    isDone: true
                });
            })
        }

        expect(result.current.todoList.length).toEqual(10);
        for (let i = 0; i < 10; i++) {
            expect(result.current.todoList[i].isDone).toEqual(i >= 5);
        }
        expect(result.current.todoList[0].createdAt > result.current.todoList[4].createdAt).toEqual(true);
        expect(result.current.todoList[5].doneAt < result.current.todoList[9].doneAt).toEqual(true);
    });
});
