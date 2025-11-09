import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from "./Footer";

describe("Footer Component", () => {
  test("renders Voyage brand name", () => {
    render(<Footer />);
    expect(screen.getByText(/Voyage/i)).toBeInTheDocument();
  });

  test("renders company section with links", () => {
    render(<Footer />);
    expect(screen.getByText(/Company/i)).toBeInTheDocument();
    expect(screen.getByText(/About us/i)).toBeInTheDocument();
    expect(screen.getByText(/Career/i)).toBeInTheDocument();
    expect(screen.getByText(/Press/i)).toBeInTheDocument();
  });

  test("renders support section with items", () => {
    render(<Footer />);
    expect(screen.getByText(/Support/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact us/i)).toBeInTheDocument();
    expect(screen.getByText(/FAQ/i)).toBeInTheDocument();
    expect(screen.getByText(/Help center/i)).toBeInTheDocument();
  });

  test("renders follow us section", () => {
    render(<Footer />);
    expect(screen.getByText(/Follow us/i)).toBeInTheDocument();
  });

  test("renders current year and copyright text", () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(year)).toBeInTheDocument();
    expect(screen.getByText(/All rights are saved/i)).toBeInTheDocument();
  });
});
