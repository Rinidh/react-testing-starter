import { render, screen } from "@testing-library/react";
import UserAccount from "../../src/components/UserAccount";
import { User } from "../../src/entities";

describe("UserAccount (User profile)", () => {
  const renderComponent = (user: User) => {
    render(<UserAccount user={user} />);

    return {
      heading: screen.getByRole("heading"),
      name: screen.getByText(user.name),
      button: screen.queryByRole("button"),
    };
  };

  it("should render correct heading, edit button and user name when user is admin", () => {
    const adminUser: User = {
      id: 1,
      name: "own user",
      isAdmin: true,
    };

    const { heading, button, name } = renderComponent(adminUser);

    expect(heading).toHaveTextContent(/profile/i);
    expect(button).toHaveTextContent(/edit/i);
    expect(name).toBeInTheDocument(); // since the name was accessed using .getByText(), it is repetitive to again assert using .toHaveTextContent()
  });

  it("should not render edit button when current user is not admin", () => {
    const otherUser: User = {
      id: 2,
      name: "other user",
    };

    const { button } = renderComponent(otherUser);

    expect(button).not.toBeInTheDocument();
  });
});
