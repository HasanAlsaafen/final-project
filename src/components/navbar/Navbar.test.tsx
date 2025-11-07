import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "./Navbar";

describe("Navbar component", () => {
  it("should render logo and navigation elements", () => {
    render(<Navbar />);
    expect(screen.getByText("Voyage")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /open menu/i })
    ).toBeInTheDocument();
  });

  it("should close the menu when Escape key is pressed", () => {
    render(<Navbar />);

    const toggleButton = screen.getByRole("button", { name: /open menu/i });
    const menu = screen.getByRole("list");

    fireEvent.click(toggleButton);
    expect(menu).toHaveClass("translate-x-0");

    fireEvent.keyDown(document, { key: "Escape" });
    expect(menu).toHaveClass("-translate-x-full");
  });
});
