import { render, screen, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import "@testing-library/jest-dom";
import FeaturedDeals from "./FeaturedDeals";

const API = "https://hotel.foothilltech.net/api/home/featured-deals";

const mockHotels = [
  {
    hotelId: 1,
    originalRoomPrice: 120,
    discount: 20,
    finalPrice: 100,
    cityName: "Hebron",
    hotelName: "Hebrom Hotel",
    hotelStarRating: 4,
    title: "A greet view in Hebron",
    description: "Enjoy your time near in Hebron",
    roomPhotoUrl: "someUrl",
  },
  {
    hotelId: 2,
    originalRoomPrice: 200,
    discount: 50,
    finalPrice: 150,
    cityName: "Lorem",
    hotelName: "Lorem ipsum",
    hotelStarRating: 5,
    title: "Test",
    description: "Lorem Ipsum adff",
    roomPhotoUrl: "someUrl",
  },
];

const server = setupServer(
  http.get(API, () => {
    return HttpResponse.json(mockHotels);
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("FeaturedDeals Component", () => {
  test("renders loading skeletons initially", async () => {
    render(<FeaturedDeals />);
    const skeletons = screen.getAllByTestId("skeleton");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  test("renders hotel cards after successful fetch", async () => {
    render(<FeaturedDeals />);

    await waitFor(() => {
      expect(screen.getByText("A greet view in Hebron")).toBeInTheDocument();
      expect(screen.getByText("Test")).toBeInTheDocument();
    });

    expect(screen.getAllByRole("img").length).toBe(2);
    expect(screen.getAllByText(/night/i).length).toBeGreaterThan(0);
  });

  test("shows error message on fetch failure", async () => {
    server.use(http.get(API, () => HttpResponse.error()));

    render(<FeaturedDeals />);

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });
});
