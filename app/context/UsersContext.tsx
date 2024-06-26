"use client";

import React, { createContext, useContext, useState } from "react";
import { User } from "@/app/types/user";

// type User = {
//   id: number;
//   name: string;
//   email: string;
//   phone: string;
//   website?: string;
//   company: {};
// };

type UsersContextType = {
  users: User[];
  fetchUsers: () => Promise<void>;
  // currentPage: number;
  // totalPages: number;
  // limit: number;
  // handlePageClick: (page: number) => void;
};

const UsersContext = createContext<UsersContextType | undefined>(undefined);

type UsersProviderProps = {
  children: React.ReactNode;
};

const UsersProvider: React.FC<UsersProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const usersResponse = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      if (!usersResponse.ok) {
        throw new Error("Failed to fetch users");
      }
      const usersData = await usersResponse.json();
      setUsers(usersData);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <>Loading...</>;
  }
  if (error) {
    return <>Something went wrong. {error} </>;
  }

  return (
    <UsersContext.Provider value={{ users, fetchUsers }}>
      {children}
    </UsersContext.Provider>
  );
};
const useUsers = () => {
  const context = React.useContext(UsersContext);
  if (!context) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return context;
};

export { UsersProvider, useUsers };
