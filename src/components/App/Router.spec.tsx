import React from "react";
import {render, screen, waitForElementToBeRemoved} from "@testing-library/react";
import {BrowserRouter, MemoryRouter} from "react-router-dom";
import {Provider} from "react-redux";
import '@testing-library/jest-dom/extend-expect'

import {Router} from "./Router";
import {Loader} from "../Loader/Loader";
import {store} from "../../store/store";

describe("Router", () => {
    test("Renders router", async () => {
        const router = render(
            <Provider store={store}>
                <React.Suspense fallback={<Loader/>}>
                    <BrowserRouter>
                        <Router/>
                    </BrowserRouter>
                </React.Suspense>
            </Provider>
        )
        if (screen.queryByText(/Loading.../i) !== null) {
            await waitForElementToBeRemoved(screen.queryByText(/Loading.../i))
        }
        expect(router).not.toBeUndefined()
    })

    test("Landing on a bad page", async () => {
        render(
            <React.Suspense fallback={<Loader/>}>
                <MemoryRouter initialEntries={['/some/bad/route']}>
                    <Router/>
                </MemoryRouter>
            </React.Suspense>
        )
        if (screen.queryByText(/Loading.../i) !== null) {
            await waitForElementToBeRemoved(screen.queryByText(/Loading.../i))
        }
        expect(screen.getByText(/Page not found/i)).toBeInTheDocument()
    })
});