import React from "react";
import {MemoryRouter} from "react-router-dom";
import {render, screen, waitFor, waitForElementToBeRemoved} from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'

import PageNotFound from "./PageNotFound";
import {Loader} from "../../components/Loader/Loader";
import {Router} from "../../components/App/Router";
import {ROUTES} from "../../common/routes";

describe("PageNotFound", () => {
    it("Renders", async () => {
        const app = render(
            <React.Suspense fallback={<Loader/>}>
                <MemoryRouter initialEntries={[ROUTES.NOT_FOUND]}>
                    <Router/>
                </MemoryRouter>
            </React.Suspense>
        );
        expect(app).not.toBeUndefined();

        if (screen.queryByText(/Loading.../i) !== null) {
            await waitForElementToBeRemoved(screen.queryByText(/Loading.../i))
        }

        await waitFor(() => expect(document.title).not.toEqual(""))

        expect(document.title).toEqual('Todo App | Page Not Found');

        const existingTag = document.head.querySelectorAll(`meta[name="description"]`)[0];
        expect(existingTag).toBeDefined();
        expect(existingTag.getAttribute('content')).toBe('Page Not Found');

        expect(screen.getByText(/Page not found/i)).toBeInTheDocument()
        expect(screen.getByText(/Go Back Home/i)).toBeInTheDocument()
    });

    it("Go home button works", async () => {
        const app = render(
            <React.Suspense fallback={<Loader/>}>
                <MemoryRouter initialEntries={[ROUTES.NOT_FOUND]}>
                    <Router/>
                </MemoryRouter>
            </React.Suspense>
        );
        expect(app).not.toBeUndefined();

        if (screen.queryByText(/Loading.../i) !== null) {
            await waitForElementToBeRemoved(screen.queryByText(/Loading.../i))
        }

        const goHomeBtn = screen.getByText(/Go Back Home/i);
        expect(goHomeBtn).toBeInTheDocument();

        await userEvent.click(goHomeBtn)
        expect(goHomeBtn).not.toBeInTheDocument();
    });
});
