import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { render, screen } from "@testing-library/react";

import HomePage from ".";
import { useCheeses } from "@hooks/cheese";

const createWrapper = (component: JSX.Element) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>;
};

jest.mock("@hooks/cheese");
const mockUseGetCheese = useCheeses as jest.Mock;

describe("HomePage", () => {
  it("renders a loading screen while fetching the cheeses", () => {
    mockUseGetCheese.mockImplementation(() => ({ isLoading: true }));
    render(createWrapper(<HomePage />));
    const loadingText = screen.getByText("loading...");
    expect(loadingText).toBeInTheDocument();
  });
});
