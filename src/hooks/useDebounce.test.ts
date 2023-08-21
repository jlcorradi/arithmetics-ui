import { act, renderHook } from "@testing-library/react";
import useDebounce from "./useDebounce";

jest.useFakeTimers();

describe("useDebounce", () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  it("should debounce function calls", () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useDebounce());

    const debouncedFunction = result.current.debounce(callback, 500);

    debouncedFunction();
    debouncedFunction();
    debouncedFunction();

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(callback).toHaveBeenCalledTimes(1);

    // Fast-forward time again
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should clear timeout on unmount", () => {
    const { result, unmount } = renderHook(() => useDebounce());

    const debouncedFunction = result.current.debounce(jest.fn(), 500);

    debouncedFunction();

    unmount();

    // Ensure that timers are cleared
    expect(jest.getTimerCount()).toBe(0);
  });
});
