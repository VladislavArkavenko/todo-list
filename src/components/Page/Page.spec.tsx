import React from "react";
import {render, waitFor} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'

import { Page } from "./Page";

describe("Page", () => {
    it("Renders page with metadata", async () => {
        const app = render(<Page title="Test title" description="Test description" />);
        expect(app).not.toBeUndefined();

        await waitFor(() => expect(document.title).not.toEqual(""))

        expect(document.title).toEqual('Todo App | Test title');

        const existingTag = document.head.querySelectorAll(`meta[name="description"]`)[0];
        expect(existingTag).toBeDefined();
        expect(existingTag.getAttribute('name')).toBe('description');
        expect(existingTag.getAttribute('content')).toBe('Test description');
    });
});
