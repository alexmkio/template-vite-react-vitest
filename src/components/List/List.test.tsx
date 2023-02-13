import { describe, it, expect, beforeAll } from "vitest";
import { screen } from "@testing-library/react";
import List from "./List";
import { renderWithRouter } from "../../util/test-utils";

describe("List Tests", () => {
  beforeAll(() => {
    renderWithRouter(<List />);
  });

  it("has a list element", () => {
    expect(screen.getByRole("list")).toBeTruthy();
  });
});
