import React, { useEffect, useState } from "react";
import "./UserList.css";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://dummyjson.com/users");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch users");
      }
    };

    fetchUsers();
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <ul className="user-list">
      {users.map((user) => (
        <li key={user.id} className="user-list-item">
          <img
            src={`https://robohash.org/${user.id}?set=set5`}
            alt={user.firstName}
            className="user-image"
          />
          <div className="user-info">
            <div className="user-name">{user.firstName + " " + user.lastName}</div>
            <div className="user-email">{user.email}</div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default UserList;