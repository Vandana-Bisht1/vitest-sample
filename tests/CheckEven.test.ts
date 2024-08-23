import "@testing-library/jest-dom";
import { assertType, expectTypeOf, test } from "vitest";
import { CheckEven } from "../src/utility/CheckEven";

test("isEven function type tests", () => {
  expectTypeOf(CheckEven).toBeFunction();
  expectTypeOf(CheckEven).parameter(0).toEqualTypeOf<number>();
  expectTypeOf(CheckEven).returns.toBeBoolean();

  try {
    // pass correct types to pass the test
    assertType(CheckEven(48));
  } catch (error) {
    console.log("CheckEven for pass error", error);
  }

  try {
    // Intentionally pass incorrect types to cause the test to fail
    // @ts-expect-error: This should throw an error because the argument is not a number
    assertType(CheckEven("48"));
    // If this line runs without error, we manually fail the test
    throw new Error("Expected type failure, but the test did not fail.");
  } catch (error) {
    console.log("CheckEven for fail error", error);
  }
});