import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import UsersPage from "./page"; // Update the path to your UsersPage component
import { useUsers } from "../context/UsersContext";

// Mock the useUsers hook
jest.mock("../context/UsersContext", () => ({
  useUsers: jest.fn(),
}));

const mockUsers = [
  { id: 1, name: "User 1" },
  { id: 2, name: "User 2" },
  { id: 3, name: "User 3" },
  { id: 4, name: "User 4" },
  { id: 5, name: "User 5" },
  { id: 6, name: "User 6" },
  { id: 7, name: "User 7" },
];

describe("UsersPage", () => {
  beforeEach(() => {
    (useUsers as jest.Mock).mockReturnValue({ users: mockUsers });
  });

  it("renders user list and pagination", () => {
    expect(true).toBe(true);
  });

  it("renders user list and pagination", () => {
    render(<UsersPage />);

    // Check if users are rendered
    mockUsers.slice(0, 5).forEach((user) => {
      expect(screen.getByText(user.name)).toBeInTheDocument();
    });

    // Check if pagination buttons are rendered
    const paginationButtons = screen.getAllByRole("button");
    expect(paginationButtons).toHaveLength(2);

    paginationButtons.forEach((button, index) => {
      expect(button).toHaveTextContent((index + 1).toString());
    });
  });

  it("changes page when pagination button is clicked", () => {
    render(<UsersPage />);

    // Click the second page button
    const secondPageButton = screen.getByText("2");
    fireEvent.click(secondPageButton);

    // Check if users from the second page are rendered
    mockUsers.slice(5, 7).forEach((user) => {
      expect(screen.getByText(user.name)).toBeInTheDocument();
    });

    // Check if users from the first page are not rendered anymore
    mockUsers.slice(0, 5).forEach((user) => {
      expect(screen.queryByText(user.name)).not.toBeInTheDocument();
    });
  });
});
