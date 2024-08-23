import "@testing-library/jest-dom";
import { afterEach, describe, expect, it, vi } from "vitest";

const messages = {
  items: [{ message: "Simple test message", from: "Testman" }],
  getLatest,
};

function getLatest(index = messages.items.length - 1) {
  return messages.items[index];
}

describe("reading messages", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should get the latest message with a spy", () => {
    const spy = vi.spyOn(messages, "getLatest");

    expect(spy.getMockName()).toEqual("getLatest");

    expect(messages.getLatest()).toEqual(
      messages.items[messages.items.length - 1]
    );

    expect(spy).toHaveBeenCalledTimes(1);

    // Modify the mock implementation to return an object
    spy.mockImplementationOnce(() => ({
      message: "new message",
      from: "friend",
    }));
    expect(messages.getLatest()).toEqual({
      message: "new message",
      from: "friend",
    });

    expect(spy).toHaveBeenCalledTimes(2);
  });

  it("should get with a mock", () => {
    const mock = vi.fn().mockImplementation(getLatest);

    expect(mock()).toEqual(messages.items[messages.items.length - 1]);
    expect(mock).toHaveBeenCalledTimes(1);

    // Modify the mock implementation to return an object
    mock.mockImplementationOnce(() => ({
      message: "new message",
      from: "friend",
    }));
    expect(mock()).toEqual({ message: "new message", from: "friend" });

    expect(mock).toHaveBeenCalledTimes(2);

    // Verify that the mock returns to its original behavior
    expect(mock()).toEqual(messages.items[messages.items.length - 1]);
    expect(mock).toHaveBeenCalledTimes(3);
  });
});