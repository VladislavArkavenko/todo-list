import React from "react";
import { Provider } from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import {MemoryRouter} from "react-router-dom";
import {render, screen, waitFor, waitForElementToBeRemoved} from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'

import TodoList from "./TodoList";
import {Loader} from "../../components/Loader/Loader";
import {Router} from "../../components/App/Router";
import {ROUTES} from "../../common/routes";
import {todoSlice} from "../../store/todo/todo";

describe("TodoList", () => {
    it("Renders", async () => {
        const store = configureStore({
            middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
            reducer: {
                todo: todoSlice.reducer,
            },
        });
        const app = render(
            <Provider store={store}>
                <React.Suspense fallback={<Loader/>}>
                    <MemoryRouter initialEntries={[ROUTES.HOME]}>
                        <Router/>
                    </MemoryRouter>
                </React.Suspense>
            </Provider>
        );
        expect(app).not.toBeUndefined();

        if (screen.queryByText(/Loading.../i) !== null) {
            await waitForElementToBeRemoved(screen.queryByText(/Loading.../i))
        }

        await waitFor(() => expect(document.title).not.toEqual(""))

        expect(document.title).toEqual('Todo App | Task list');

        const existingTag = document.head.querySelectorAll(`meta[name="description"]`)[0];
        expect(existingTag).toBeDefined();
        expect(existingTag.getAttribute('content')).toBe('Task list');

        expect(screen.getByText(/Your task list/i)).toBeInTheDocument()
    });

    it("On add new task new inputs are created", async () => {
        const store = configureStore({
            middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
            reducer: {
                todo: todoSlice.reducer,
            },
        });
        const app = render(
            <Provider store={store}>
                <React.Suspense fallback={<Loader/>}>
                    <MemoryRouter initialEntries={[ROUTES.HOME]}>
                        <Router/>
                    </MemoryRouter>
                </React.Suspense>
            </Provider>
        );
        expect(app).not.toBeUndefined();

        if (screen.queryByText(/Loading.../i) !== null) {
            await waitForElementToBeRemoved(screen.queryByText(/Loading.../i))
        }

        const newTaskBtn = screen.getByText(/New task/i);
        expect(newTaskBtn).toBeInTheDocument();

        let deleteBtn = screen.queryByText(/Delete/i);
        expect(deleteBtn).toBeNull();
        let textInputEl = document.querySelectorAll(`input[name="text"]`)[0];
        expect(textInputEl).toBeUndefined();
        let isDoneInputEl = document.querySelectorAll(`input[name="isDone"]`)[0];
        expect(isDoneInputEl).toBeUndefined();

        await userEvent.click(newTaskBtn)

        deleteBtn = screen.queryByText(/Delete/i);
        expect(deleteBtn).toBeInTheDocument();
        textInputEl = document.querySelectorAll(`input[name="text"]`)[0];
        expect(textInputEl).toBeInTheDocument();
        expect((textInputEl as HTMLInputElement).value).toEqual("");
        isDoneInputEl = document.querySelectorAll(`input[name="isDone"]`)[0];
        expect(isDoneInputEl).toBeInTheDocument();
        expect((textInputEl as HTMLInputElement).checked).toEqual(false);
    });

    it("On delete task inputs removed", async () => {
        const store = configureStore({
            middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
            reducer: {
                todo: todoSlice.reducer,
            },
        });
        const app = render(
            <Provider store={store}>
                <React.Suspense fallback={<Loader/>}>
                    <MemoryRouter initialEntries={[ROUTES.HOME]}>
                        <Router/>
                    </MemoryRouter>
                </React.Suspense>
            </Provider>
        );
        expect(app).not.toBeUndefined();

        if (screen.queryByText(/Loading.../i) !== null) {
            await waitForElementToBeRemoved(screen.queryByText(/Loading.../i))
        }

        const newTaskBtn = screen.getByText(/New task/i);
        expect(newTaskBtn).toBeInTheDocument();

        let deleteBtn = screen.queryByText(/Delete/i);
        expect(deleteBtn).toBeNull();
        let textInputEl = document.querySelectorAll(`input[name="text"]`)[0];
        expect(textInputEl).toBeUndefined();
        let isDoneInputEl = document.querySelectorAll(`input[name="isDone"]`)[0];
        expect(isDoneInputEl).toBeUndefined();

        await userEvent.click(newTaskBtn)

        deleteBtn = screen.queryByText(/Delete/i);
        expect(deleteBtn).toBeInTheDocument();
        textInputEl = document.querySelectorAll(`input[name="text"]`)[0];
        expect(textInputEl).toBeInTheDocument();
        expect((textInputEl as HTMLInputElement).value).toEqual("");
        isDoneInputEl = document.querySelectorAll(`input[name="isDone"]`)[0];
        expect(isDoneInputEl).toBeInTheDocument();
        expect((textInputEl as HTMLInputElement).checked).toEqual(false);

        await userEvent.click(deleteBtn as HTMLElement)

        deleteBtn = screen.queryByText(/Delete/i);
        expect(deleteBtn).toBeNull();
        textInputEl = document.querySelectorAll(`input[name="text"]`)[0];
        expect(textInputEl).toBeUndefined();
        isDoneInputEl = document.querySelectorAll(`input[name="isDone"]`)[0];
        expect(isDoneInputEl).toBeUndefined();
    });

    it("Typing text in input work right", async () => {
        const store = configureStore({
            middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
            reducer: {
                todo: todoSlice.reducer,
            },
        });
        const app = render(
            <Provider store={store}>
                <React.Suspense fallback={<Loader/>}>
                    <MemoryRouter initialEntries={[ROUTES.HOME]}>
                        <Router/>
                    </MemoryRouter>
                </React.Suspense>
            </Provider>
        );
        expect(app).not.toBeUndefined();

        if (screen.queryByText(/Loading.../i) !== null) {
            await waitForElementToBeRemoved(screen.queryByText(/Loading.../i))
        }

        const newTaskBtn = screen.getByText(/New task/i);
        expect(newTaskBtn).toBeInTheDocument();

        await userEvent.click(newTaskBtn)

        let textInputEl = document.querySelectorAll(`input[name="text"]`)[0];
        expect(textInputEl).toBeInTheDocument();
        expect((textInputEl as HTMLInputElement).value).toEqual("");

        await userEvent.type(textInputEl, "Test task")
        expect((textInputEl as HTMLInputElement).value).toEqual("Test task");
    });

    it("On mark as done checkbox become checked", async () => {
        const store = configureStore({
            middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
            reducer: {
                todo: todoSlice.reducer,
            },
        });
        const app = render(
            <Provider store={store}>
                <React.Suspense fallback={<Loader/>}>
                    <MemoryRouter initialEntries={[ROUTES.HOME]}>
                        <Router/>
                    </MemoryRouter>
                </React.Suspense>
            </Provider>
        );
        expect(app).not.toBeUndefined();

        if (screen.queryByText(/Loading.../i) !== null) {
            await waitForElementToBeRemoved(screen.queryByText(/Loading.../i))
        }

        const newTaskBtn = screen.getByText(/New task/i);
        expect(newTaskBtn).toBeInTheDocument();

        await userEvent.click(newTaskBtn)

        let isDoneInputEl = document.querySelectorAll(`input[name="isDone"]`)[0];
        expect(isDoneInputEl).toBeInTheDocument();
        expect((isDoneInputEl as HTMLInputElement).checked).toEqual(false);

        await userEvent.click(isDoneInputEl)
        expect((isDoneInputEl as HTMLInputElement).checked).toEqual(true);
    });

    it("Display exactly in the order from selector", async () => {
        const store = configureStore({
            preloadedState: {
                todo: {
                    todoMap: {
                        "1": {
                            id: "1",
                            text: "Text 1",
                            doneAt: 0,
                            isDone: false,
                            createdAt: Date.now() + 1,
                        },
                        "3": {
                            id: "3",
                            text: "Text 3",
                            doneAt: 0,
                            isDone: true,
                            createdAt: Date.now(),
                        },
                        "2": {
                            id: "2",
                            text: "Text 2",
                            doneAt: 0,
                            isDone: false,
                            createdAt: Date.now(),
                        },
                        "4": {
                            id: "4",
                            text: "Text 4",
                            doneAt: 0,
                            isDone: true,
                            createdAt: Date.now() + 1,
                        },
                    }
                }
            },
            middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
            reducer: {
                todo: todoSlice.reducer,
            },
        });
        const app = render(
            <Provider store={store}>
                <React.Suspense fallback={<Loader/>}>
                    <MemoryRouter initialEntries={[ROUTES.HOME]}>
                        <Router/>
                    </MemoryRouter>
                </React.Suspense>
            </Provider>
        );
        expect(app).not.toBeUndefined();

        if (screen.queryByText(/Loading.../i) !== null) {
            await waitForElementToBeRemoved(screen.queryByText(/Loading.../i))
        }

        let isDoneInputElements = document.querySelectorAll(`input[name="text"]`);
        expect(isDoneInputElements.length).toEqual(4);

        expect((isDoneInputElements[0] as HTMLInputElement).value).toEqual("Text 1");
        expect((isDoneInputElements[1] as HTMLInputElement).value).toEqual("Text 2");
        expect((isDoneInputElements[2] as HTMLInputElement).value).toEqual("Text 3");
        expect((isDoneInputElements[3] as HTMLInputElement).value).toEqual("Text 4");
    });
});
