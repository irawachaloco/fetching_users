"use client";

import Link from "next/link";
import { useState } from "react";
import { useUsers } from "../context/UsersContext";

const UsersPage = () => {
  const { users } = useUsers();
  const [currentPage, setcurrentPage] = useState(1);
  const limit = 5;
  const totalPages = Math.ceil(users.length / limit);

  const displayedUsers = users.slice(
    currentPage * limit - limit,
    currentPage * limit
  );

  const handlePageClick = (page: number) => {
    setcurrentPage(page);
  };

  return (
    <main className="m-4">
      <div>
        <h1>Users list:</h1>
        <ul className="grid grid-cols-2 gap-4 mt-4">
          {displayedUsers.map((user) => (
            <li
              className="rounded border p-2 hover:bg-blue-400 hover:text-white"
              key={user.id}
            >
              <Link href={`/users/${user.id}`}>
                <p className="text-2xl font-bold">{user.name}</p>
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex justify-center mt-4">
          {Array.from({ length: totalPages }).map((_, index) => (
            <li key={index}>
              <button
                className={`rounded bg-blue-200 px-4 py-2 m-2 hover:bg-blue-400 ${
                  currentPage === index + 1 ? "bg-blue-400 text-white" : ""
                }`}
                onClick={() => handlePageClick(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default UsersPage;
