import { render, screen } from "@testing-library/react";
import { it, expect, describe } from "vitest";
import UserList from "../../src/components/UserList";
import { User } from "../../src/entities";

describe("UserList", () => {
  it("should render a message and no list when there are no users", () => {
    render(<UserList users={[]} />);

    expect(screen.getByText(/no users/i)).toBeInTheDocument();
  });

  it("should render a list of user name-links when users are provided", () => {
    const users: User[] = [
      { id: 1, name: "user1" },
      { id: 2, name: "user2" },
    ];

    render(<UserList users={users} />);

    users.forEach((user) => {
      const userNameLink = screen.getByRole("link", { name: user.name });

      expect(userNameLink).toHaveAttribute("href", `/users/${user.id}`);
    });
  });
});
