import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import { createBrowserHistory } from "history";
import userEvent from "@testing-library/user-event";
import { Router } from "react-router-dom";

export function renderWithRouter(ui: React.ReactElement, path: string = "/") {
  const history = createBrowserHistory();
  history.push(path);

  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <Router location={history.location} navigator={history}>
        {children}
      </Router>
    );
  }

  return {
    ...render(ui, { wrapper: Wrapper }),
    history,
    user: userEvent.setup(),
  };
}
