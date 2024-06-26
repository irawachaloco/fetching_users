import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useParams } from "next/navigation";
import { useUsers } from "../../context/UsersContext";
import UserPage from "./page";

jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
}));

jest.mock("../../context/UsersContext", () => ({
  useUsers: jest.fn(),
}));

describe("UserPage", () => {
  it("renders user details correctly", () => {
    const mockUser = {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      username: "johndoe",
      address: {
        street: "123 Main St",
        suite: "Apt 1",
        city: "Anytown",
        zipcode: "12345",
        geo: {
          lat: "40.7128",
          lng: "74.0060",
        },
      },
      phone: "555-1234",
      website: "johndoe.com",
      company: {
        name: "Doe Enterprises",
        catchPhrase: "Innovate your world",
        bs: "enterprise solutions",
      },
    };

    const mockUseParams = useParams as jest.Mock;
    const mockUseUsers = useUsers as jest.Mock;

    mockUseParams.mockReturnValue({ userId: "1" });
    mockUseUsers.mockReturnValue({ users: [mockUser] });

    render(<UserPage />);

    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    expect(screen.getByText(`${mockUser.email}`)).toBeInTheDocument();
    expect(screen.getByText(`${mockUser.username}`)).toBeInTheDocument();
    expect(screen.getByText(`${mockUser.phone}`)).toBeInTheDocument();
    expect(screen.getByText(`${mockUser.website}`)).toBeInTheDocument();
    expect(
      screen.getByText(
        `${mockUser.company.name}, ${mockUser.company.catchPhrase}, ${mockUser.company.bs}`
      )
    ).toBeInTheDocument();
  });
});
