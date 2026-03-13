import { render, screen } from "@testing-library/react";
import ExpandableText from "../../src/components/ExpandableText";
import userEvent from "@testing-library/user-event";

describe("ExpandableText", () => {
  const limit = 255;
  const longText = "a".repeat(limit + 1);
  const truncatedText = longText.substring(0, limit) + "...";

  it("should render full text if less than 255 characters", () => {
    const text = "short text";

    render(<ExpandableText text={text} />);

    expect(screen.getByText(text)).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /\b(show less|show more)\b/i })
    ).not.toBeInTheDocument();
  });

  it("should render truncated text and the show more button if longer than 255 characters", () => {
    render(<ExpandableText text={longText} />);

    expect(screen.getByText(truncatedText)).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent(/more/i);
  });

  it("should expand text and change button text when 'Show More' button is cliked", async () => {
    render(<ExpandableText text={longText} />);

    const user = userEvent.setup();
    const button = screen.getByRole("button");
    await user.click(button);

    const screenText = screen.getByRole("article");
    expect(screenText.textContent).toHaveLength(longText.length);
    expect(screenText).not.toHaveTextContent(/\.\.\.$/);
    expect(button).toHaveTextContent(/show less/i);
  });
});
