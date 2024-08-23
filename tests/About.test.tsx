import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import About from "../src/components/About";

describe("About", () => {
  it.concurrent.only("renders About Component", () => {
    render(<About />);
  });
  it.concurrent("check for header Text in About Component", () => {
    const headerText = screen.getByText(/This is About Component/i);
    expect(headerText).toBeInTheDocument();
  });
  it.concurrent.only("check for para Text in About Component", () => {
    const paraText = screen.getByText(/This para is in About Component/i);
    expect(paraText).toBeInTheDocument();
  });
});

describe.todo("unimplemented suite");
describe("About Todo", () => {
  it.todo("unimplemented test");
});