import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import { expect, test } from "vitest";
import { userEvent } from '@testing-library/user-event';
import Login from "../src/components/login/Login";
import React from "react";

test("Login form UI elements", async () => {
  render(<Login />);

  const emailInput = screen.getByLabelText(/Email/i);
  const passwordInput = screen.getByLabelText(/Password/i);
  const checkbox = screen.getByLabelText(/Accept Terms and Conditions/i);
  const submitButton = screen.getByRole("button", { name: /Login/i });
  const form = screen.getByTestId("login-form");

  // Check initial state of the form elements
  expect(submitButton).toBeDisabled();
  expect(form).not.toBeEmptyDOMElement();
  expect(emailInput).toBeInvalid();
  
  // Simulate user interaction with userEvent and fireEvent
  userEvent.clear(emailInput);
  userEvent.clear(passwordInput);
  userEvent.click(checkbox);
  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "password" } });
  expect(emailInput).toBeValid();

  expect(checkbox).not.toBeChecked();
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  expect(checkbox).not.toBePartiallyChecked();

  expect(submitButton).toBeEnabled();

  const successMessage = screen.queryByText(/Login Successful!/i);
  expect(successMessage).toBeNull();

  expect(form).toBeInTheDocument();

  // Validate form requirements
  expect(emailInput).toBeRequired();
  expect(passwordInput).toBeRequired();
  expect(checkbox).not.toBeRequired();
  expect(emailInput).toBeVisible();
  expect(passwordInput).toBeVisible();
  expect(checkbox).toBeVisible();
  expect(submitButton).toBeVisible();

  // Validate form structure and content
  expect(form).toContainElement(emailInput);
  expect(form).toContainElement(passwordInput);
  expect(form).toContainElement(checkbox);
  expect(form).toContainHTML("<h2>Login</h2>");

  // Accessibility checks
  expect(emailInput).toHaveAccessibleName("Email:");
  expect(passwordInput).toHaveAccessibleName("Password:");
  expect(checkbox).toHaveAccessibleName("Accept Terms and Conditions");
  expect(submitButton).toHaveAccessibleName("Login");

  // Validate input attributes
  expect(emailInput).toHaveAttribute("type", "email");
  expect(passwordInput).toHaveAttribute("type", "password");
  expect(checkbox).toHaveAttribute("type", "checkbox");

  // Check CSS classes
  expect(emailInput).toHaveClass("form-control");
  expect(passwordInput).toHaveClass("form-control");
  expect(submitButton).toHaveClass("login-button");

  // Interaction: Focus and form values
  emailInput.focus();
  expect(emailInput).toHaveFocus();
  expect(form).toHaveFormValues({
    email: "test@example.com",
    password: "password",
    terms: true,
  });

  // Style checks
  expect(submitButton).toHaveStyle("cursor: pointer;");
  expect(submitButton).toHaveTextContent(/Login/i);

  // Final assertions
  expect(emailInput).toHaveValue("test@example.com");
  expect(passwordInput).toHaveValue("password");
  expect(emailInput).toHaveDisplayValue("test@example.com");
  expect(submitButton).toHaveRole("button");

  // Simulate form submission
  fireEvent.click(submitButton);
  expect(screen.getByText(/Login Successful!/i)).toBeInTheDocument();
});

// Helper function to perform login and check success message
const performLogin = async (email: string, password: string) => {
  cleanup();
  render(<Login />);

  const emailInput = screen.getByLabelText(/Email/i);
  const passwordInput = screen.getByLabelText(/Password/i);
  const checkbox = screen.getByRole('checkbox', { name: /Accept Terms and Conditions/i }); // Use getByRole for specificity
  const submitButton = screen.getByRole('button', { name: /Login/i });

  // Reset inputs and simulate user interaction
  fireEvent.change(emailInput, { target: { value: '' } });
  fireEvent.change(passwordInput, { target: { value: '' } });
  fireEvent.click(checkbox);
  fireEvent.change(emailInput, { target: { value: email } });
  fireEvent.change(passwordInput, { target: { value: password } });
  fireEvent.click(submitButton);

  // Wait for the success message to appear
  return waitFor(() => screen.queryByText(/Login Successful!/i));
};

test(
  'Login form UI elements with retry logic',
  async () => {
    const maxRetries = 3;
    let successMessage: HTMLElement | null = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      const password = attempt === maxRetries ? 'password' : 'abc';    
      console.log(`Attempt ${attempt}: email=test@example.com, password=${password}`);
      successMessage = await performLogin('test@example.com', password);

      if (successMessage) {
        break;
      }

      if (attempt < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    await waitFor(
      () => {
        expect(successMessage).toBeInTheDocument();
      },
      { timeout: 5000 }
    );
  },
  { retry: 3 } // Retry option added here
);

test("Login form UI elements with expect.poll logic", async () => {
  const maxRetries = 3;
  let successMessage: HTMLElement | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const password = attempt === maxRetries ? 'password' : 'abc';
    console.log(`Attempt ${attempt}: email=test@example.com, password=${password}`);
    successMessage = await performLogin('test@example.com', password);

    if (successMessage) {
      break;
    }

    if (attempt < maxRetries) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  await expect
    .poll(() => successMessage?.textContent, {
      timeout: 5000, // 5 seconds timeout
      interval: 100, // Poll every 100ms
    })
    .toBe("Login Successful!");
});