import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import App from "../src/App";
import React from "react";
import { describe, it } from "vitest";

describe("App", () => {
  it("renders the App component", () => {
    render(<App />);
    screen.debug(); // prints out the tsx in the App component unto the command line
  });
});
