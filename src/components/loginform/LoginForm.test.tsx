import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginForm from "./LoginForm";
import { MemoryRouter } from "react-router-dom";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import {
  describe,
  test,
  expect,
  beforeAll,
  afterEach,
  afterAll,
  vi,
} from "vitest";

interface LoginRequestBody {
  username: string;
  password: string;
}

interface LoginResponseBody {
  token: string;
}

const API = "https://hotel.foothilltech.net";

const server = setupServer(
  http.post(`${API}/api/auth/authenticate`, async ({ request }) => {
    const body = (await request.json()) as LoginRequestBody;

    if (body.username === "admin" && body.password === "admin") {
      return HttpResponse.json<LoginResponseBody>({ token: "test" });
    }

    return HttpResponse.json(
      { error: "Invalid username or password" },
      { status: 401 }
    );
  })
);

beforeAll(() => {
  vi.spyOn(console, "log").mockImplementation(() => {});
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  vi.clearAllMocks();
});

afterAll(() => server.close());

describe("LoginForm Tests", () => {
  test("renders form inputs", () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  test("shows validation errors if fields empty", async () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    fireEvent.blur(screen.getByLabelText(/username/i));
    fireEvent.blur(screen.getByLabelText(/password/i));
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    const errors = await screen.findAllByText("Required");
    expect(errors.length).toBe(2);
  });

  test("toggles password visibility", () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
    const passwordInput = screen.getByLabelText(
      /password/i
    ) as HTMLInputElement;

    expect(passwordInput.type).toBe("password");

    fireEvent.click(screen.getByTestId("toggle-password"));
    expect(passwordInput.type).toBe("text");
  });

  test("submits form successfully", async () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "admin" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "admin" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(console.log).toHaveBeenCalled();
    });
  });
  test("shows error message on invalid login", async () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "wrong" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "wrong" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));
    await waitFor(() => {
      expect(
        screen.getByText(/invalid username or password/i)
      ).toBeInTheDocument();
    });
  });
});
