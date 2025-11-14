import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import Searchbar from "./Searchbar";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => mockNavigate };
});

describe("Searchbar Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test("renders heading and search button", () => {
    render(
      <MemoryRouter>
        <Searchbar />
      </MemoryRouter>
    );
    expect(
      screen.getByText(/Unforgettable Journeys Await/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Search/i })).toBeInTheDocument();
  });

  test("submits form and navigates on successful search", async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 1, name: "Hotel Test" }],
    });

    render(
      <MemoryRouter>
        <Searchbar />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Hotels or cities/i), {
      target: { value: "Paris" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Search/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith("/searchresults", {
        state: { results: [{ id: 1, name: "Hotel Test" }] },
      });
    });
  });

  test("shows alert on failed fetch", async () => {
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
    (fetch as any).mockResolvedValueOnce({ ok: false, status: 500 });

    render(
      <MemoryRouter>
        <Searchbar />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Hotels or cities/i), {
      target: { value: "Rome" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Search/i }));

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith(
        "Failed to fetch hotels. Please try again."
      );
    });

    alertMock.mockRestore();
  });
});
