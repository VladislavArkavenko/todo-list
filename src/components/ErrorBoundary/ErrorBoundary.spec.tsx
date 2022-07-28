import React from "react";
import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'

import { ErrorBoundary } from "./ErrorBoundary";

const ComponentWithError = () => {
    throw new Error("Test Error")
}

describe("ErrorBoundary", () => {
    it("Renders app", () => {
        render(
            <ErrorBoundary>
                <ComponentWithError />
            </ErrorBoundary>
        );
        expect(screen.getByText(/There was an error/i)).toBeInTheDocument()
    });
});
