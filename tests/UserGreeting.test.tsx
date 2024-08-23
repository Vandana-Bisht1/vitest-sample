import "@testing-library/jest-dom";
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { UserGreeting } from "../src/components/UserGreeting";
import * as userService from "../src/services/userService";

describe("UserGreeting", () => {
  it("should display user name when getUser resolves", async () => {
    vi.spyOn(userService, "getUser").mockResolvedValue({
      name: "Vandana Bisht",
    });
    render(<UserGreeting />);
    await waitFor(() => {
      expect(screen.getByText("Hello, Vandana Bisht!")).toBeInTheDocument();
    });
    console.log(
      "Is mocked before restore:",
      vi.isMockFunction(userService.getUser)
    ); // true
    vi.restoreAllMocks();
    console.log(
      "Is mocked after restore:",
      vi.isMockFunction(userService.getUser)
    ); // false
  });

  it('should display "Guest" when getUser rejects', async () => {
    vi.spyOn(userService, "getUser").mockRejectedValue(
      new Error("Failed to fetch user")
    );
    render(<UserGreeting />);
    await waitFor(() => {
      expect(screen.getByText("Hello, Guest!")).toBeInTheDocument();
    });
    vi.restoreAllMocks();
  });

  it("should display user gender", async () => {
    vi.mock("./userService", () => ({
      getUser: vi.fn().mockResolvedValue({ name: "Vandana Bisht" }),
      getUserGender: vi.fn().mockResolvedValue({ gender: "Female" }),
    }));
    render(<UserGreeting />);
    await waitFor(() => {
      expect(screen.getByText("Hello, Vandana Bisht!")).toBeInTheDocument();
      expect(screen.getByText("Gender: Female")).toBeInTheDocument();
    });
    vi.restoreAllMocks();
  });
});
