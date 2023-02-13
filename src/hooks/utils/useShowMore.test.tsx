import { act, renderHook } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useShowMore } from "./useShowMore";

describe("Testing useShowMore", () => {
  it("should not show", () => {
    const { result } = renderHook(() =>
      useShowMore({ totalCount: 10, initialCount: 5 })
    );
    expect(result.current.canShowMore).toBe(true);
  });

  it("should show", () => {
    const { result } = renderHook(() =>
      useShowMore({ totalCount: 10, initialCount: 12 })
    );
    expect(result.current.canShowMore).toBe(false);
    expect(result.current.hasMore).toBe(false);
  });

  it("should show intially and not show after exceeding limit on click", () => {
    const { result } = renderHook(() =>
      useShowMore({ totalCount: 10, initialCount: 5 })
    );
    expect(result.current.hasMore).toBe(true);
    act(() => result.current.onClick());
    expect(result.current.hasMore).toBe(false);
  });

  it("should filter items and show all after click", () => {
    const items = new Array(20).fill("").map((_, index) => index);
    const { result } = renderHook(() =>
      useShowMore({ totalCount: items.length, initialCount: 5 })
    );
    const filtered1 = items.filter(result.current.filter);
    expect(filtered1).toStrictEqual([0, 1, 2, 3, 4]);
    act(() => result.current.onClick());
    const filtered2 = items.filter(result.current.filter);
    expect(filtered2.length).toBe(20);
  });

  it("should filter items against reveal count", () => {
    const items = new Array(20).fill("").map((_, index) => index);
    const { result } = renderHook(() =>
      useShowMore({
        totalCount: items.length,
        initialCount: 5,
        revealCount: 5,
      })
    );
    const filtered1 = items.filter(result.current.filter);
    expect(filtered1).toStrictEqual([0, 1, 2, 3, 4]);
    act(() => result.current.onClick());
    const filtered2 = items.filter(result.current.filter);
    expect(filtered2).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it("should filter items against reveal count and detect end", () => {
    const items = new Array(20).fill("").map((_, index) => index);
    const { result } = renderHook(() =>
      useShowMore({
        totalCount: items.length,
        initialCount: 5,
        revealCount: 10,
      })
    );
    const filtered1 = items.filter(result.current.filter);
    expect(filtered1).toStrictEqual([0, 1, 2, 3, 4]);
    expect(result.current.hasMore).toBe(true);
    act(() => result.current.onClick());
    act(() => result.current.onClick());
    const filtered2 = items.filter(result.current.filter);
    expect(filtered2.length).toBe(20);
    expect(result.current.hasMore).toBe(false);
  });
});
