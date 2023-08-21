import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import http from "../Http"; // Mock this dependency
import { useGlobalState } from "../context/GlobalState.context"; // Mock this dependency
import { useExecuteOperation } from "./useExecuteOperation";

// Mocking http module
jest.mock("../Http", () => ({
  post: jest.fn(),
}));

// Mock useGlobalState
jest.mock("../context/GlobalState.context", () => ({
  useGlobalState: jest.fn(),
}));

describe("useExecuteOperation", () => {
  it("should execute operation and update executionResult", async () => {
    // Mocking http.post implementation
    http.post.mockResolvedValue({
      data: {
        id: 34,
        date: "2023-08-21T03:31:50.375249442",
        description: "Multiplication (3396.0, 5.34)",
        price: 2.0,
        userBalance: 10.0,
        result: "18134.64",
      },
    });

    // Mocking useGlobalState hook
    useGlobalState.mockReturnValue({
      actions: { updateUserData: jest.fn() },
    });

    // Rendering the hook
    const { result } = renderHook(() => useExecuteOperation());

    const { execute, setOperation } = result.current;
    act(() =>
      setOperation({
        operationType: "MULTIPLICATION",
        cost: 2.0,
        description: "",
        paramsQuantity: 2,
      })
    );

    // Call the execute function
    await act(async () => {
      await execute([3396.0, 5.34]);
    });

    // Assert the state changes
    expect(result.current.executionResult.result).toBe("18134.64");
    expect(result.current.executionResult.description).toBe(
      "Multiplication (3396.0, 5.34)"
    );
    expect(result.current.executionResult.price).toBe(2.0);
    expect(result.current.executionResult.userBalance).toBe(10.0);
    expect(result.current.executionResult.result).toBe("18134.64");
  });

  it("should set busy to false on catch", async () => {
    // Mocking http.post implementation to throw an error
    http.post.mockRejectedValue(new Error("Test error"));

    // Mocking useGlobalState hook
    useGlobalState.mockReturnValue({
      actions: { updateUserData: jest.fn() },
    });

    // Rendering the hook
    const { result } = renderHook(() => useExecuteOperation());

    const { execute } = result.current;

    // Call the execute function
    await act(async () => {
      await execute([1, 2, 3]);
    });

    // Assert the state changes
    expect(result.current.busy).toBe(false);
  });
});
