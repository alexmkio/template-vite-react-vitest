import { describe, it, expect, afterEach } from "vitest";
import { cleanup, screen, waitFor, within } from "@testing-library/react";
import Header from "./Header";
import { renderWithRouter } from "../../util/test-utils";

describe("Header Tests", () => {
  afterEach(() => {
    cleanup();
  });

  it("has a heading element", () => {
    renderWithRouter(<Header />);

    expect(screen.getByRole("heading", { name: /Header/i })).toBeTruthy();
  });

  describe("Describes '/' Route", () => {
    it("does not have a link to home page", () => {
      renderWithRouter(<Header />);

      expect(screen.queryByRole("link", { name: /home/i })).toBeFalsy();
    });
  });

  describe("Describes '/dog/:dogId' Route", () => {
    it("has a link to home page", () => {
      const { history } = renderWithRouter(<Header />, "/dog/123");

      expect(history.location.pathname).toBe("/dog/123");

      const nav = screen.getByRole("navigation");

      expect(within(nav).getByRole("link", { name: /home/i })).toBeTruthy();
    });

    it("the link to home page works as intended", async () => {
      const { user, history } = renderWithRouter(<Header />, "/dog/123");

      const nav = screen.getByRole("navigation");

      await user.click(
        within(nav).getByRole("link", {
          name: /home/i,
        })
      );

      await waitFor(() => {
        expect(history.location.pathname).toBe("/");
      });
    });
  });
});
