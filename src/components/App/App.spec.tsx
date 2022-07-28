import React from "react";
import { render } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'

import { App } from "./App";

describe("App", () => {
  it("Renders app", () => {
    const app = render(<App />);
    expect(app).not.toBeUndefined();
  });
});
