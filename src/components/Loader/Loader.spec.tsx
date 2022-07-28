import React from "react";
import { render } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'

import { Loader } from "./Loader";

describe("Loader", () => {
    it("Renders Loader", () => {
        const app = render(<Loader />);
        expect(app).not.toBeUndefined();
    });
});
