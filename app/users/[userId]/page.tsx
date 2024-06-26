"use client";

import { useParams } from "next/navigation";
import { useUsers } from "@/app/context/UsersContext";

const UserPage = () => {
  const { users } = useUsers();
  const params = useParams();
  const id = params.userId;

  console.log("users from user detail", users);
  console.log("ID", id);

  const user = users.find((user) => user.id === Number(id));

  return (
    <div className="m-4">
      <p className="text-2xl font-bold">{user?.name}</p>
      <p>
        <strong>Email: </strong>
        {user?.email}
      </p>
      <p>
        <strong>User name: </strong>
        {user?.username}
      </p>
      <p>
        <strong>Address: </strong>
        {user?.address.street}, {user?.address.suite}, {user?.address.city},
        {user?.address.zipcode}, {user?.address.geo.lat},{user?.address.geo.lng}
      </p>
      <p>
        <strong>Phone: </strong>
        {user?.phone}
      </p>
      <p>
        <strong>Website: </strong>
        {user?.website}
      </p>
      <p>
        <strong>Company: </strong>
        {user?.company.name}, {user?.company.catchPhrase}, {user?.company.bs}
      </p>
    </div>
  );
};

export default UserPage;
