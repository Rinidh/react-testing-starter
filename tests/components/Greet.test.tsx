import { render, screen } from "@testing-library/react";
import Greet from "../../src/components/Greet";

describe("Greet", () => {
  const renderComponent = (name?: string) => {
    render(<Greet name={name} />);

    return {
      heading: screen.queryByRole("heading"),
      button: screen.queryByRole("button"),
    };
  };

  it("should render h1 with greet message and name when name is provided", () => {
    const { heading } = renderComponent("radhe krishna");

    expect(heading).toHaveTextContent(/radhe krishna/i);
  });

  it("should render login button when name is not provided", () => {
    const { button } = renderComponent();

    expect(button).toHaveTextContent(/login/i);
  });
});
