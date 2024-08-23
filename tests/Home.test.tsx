import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Home from "../src/components/Home"; // Ensure the path is correct
import React from "react";

describe.concurrent("Home", () => {
  it.concurrent("check if header text exists", async () => {
    render(<Home />);
    const headingElement = screen.getByText(/This is home component/i);
    expect(headingElement).toBeInTheDocument();
  });

  it.concurrent("check if para exists", async () => {
    const paraElement = screen.getByTestId("para");
    expect(paraElement).toBeInTheDocument();
    expect(paraElement).toHaveTextContent(
      /This is the paragraph in home page/i
    );
  });

  it("Home component snapshot test", () => {
    const { asFragment } = render(<Home />);
    // Create a snapshot of the component's output
    expect(asFragment()).toMatchSnapshot();
  });
});