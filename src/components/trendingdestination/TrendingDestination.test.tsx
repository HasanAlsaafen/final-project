import { render, screen, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import "@testing-library/jest-dom";
import TrendingDestination from "./TrendingDestination";

const API = "https://hotel.foothilltech.net/api/home/destinations/trending";

const mockTrends = [
  {
    cityId: 1,
    cityName: "Ramallah",
    countryName: "Palestine",
    description:
      "Explore the vibrant city of Ramallah, known for its rich history and cultural diversity. Discover historical landmarks, bustling markets, and enjoy the warmth of Palestinian hospitality.",
    thumbnailUrl:
      "https://www.irishtimes.com/resizer/zKAUput0v-pdbzu3keSyhWThHJY=/1600x0/filters:format(jpg):quality(70)/cloudfront-eu-central-1.images.arcpublishing.com/irishtimes/N4P6EWEXC55QQBJJ5Q43X66BPU.jpg",
  },
  {
    cityId: 3,
    cityName: "New York",
    countryName: "United States",
    description:
      "Experience the iconic cityscape of New York, where skyscrapers touch the clouds and diverse cultures converge. Visit famous landmarks, explore Central Park, and indulge in world-class dining.",
    thumbnailUrl:
      "https://worldstrides.com/wp-content/uploads/2015/07/iStock_000040849990_Large.jpg",
  },
];

const server = setupServer(
  http.get(API, () => {
    return HttpResponse.json(mockTrends);
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("TrendingDestination Component", () => {
  test("renders loading skeletons initially", async () => {
    render(<TrendingDestination />);
    const skeletons = screen.getAllByTestId("skeleton");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  test("renders Trending Destination cards after successful fetch", async () => {
    render(<TrendingDestination />);

    await waitFor(() => {
      expect(screen.getByText("Palestine , Ramallah")).toBeInTheDocument();
      expect(screen.getByText("United States , New York")).toBeInTheDocument();
    });

    expect(screen.getAllByRole("img").length).toBe(2);
  });

  test("shows error message on fetch failure", async () => {
    server.use(http.get(API, () => HttpResponse.error()));

    render(<TrendingDestination />);

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });
});
