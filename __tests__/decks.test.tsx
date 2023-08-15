import DecksContainer from "@/app/decks/decks-container";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

describe("decks", () => {
  it("should open modal when click on add button", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <DecksContainer />
      </QueryClientProvider>
    );

    const createDeckButton = screen.getByRole("button", {
      name: "create deck",
    });

    fireEvent.click(createDeckButton);

    const modalCreateDeck = screen.getByText("create deck");

    expect(modalCreateDeck).toBeInTheDocument();
  });
});
