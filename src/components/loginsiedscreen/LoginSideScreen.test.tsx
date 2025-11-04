import { render, screen } from "@testing-library/react";
import LoginSideScreen from "./LoginSideScreen";

describe("LoginSideScreen Component", () => {
  test("renders heading text", () => {
    render(<LoginSideScreen />);
    const headingText = screen.getByRole("heading", {
      name: /Your journey begins with a single step/i,
    });
    expect(headingText).toBeInTheDocument();
  });

  test("renders sub text", () => {
    render(<LoginSideScreen />);
    const subText = screen.getByText(/Discover the world's most breathtaking/i);
    expect(subText).toBeInTheDocument();
  });
});
