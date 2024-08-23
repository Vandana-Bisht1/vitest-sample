import React, { useEffect, useState } from "react";
import { getUser, getUserGender } from "../services/userService";

export const UserGreeting: React.FC = () => {
  const [name, setName] = useState<string | null>(null);
  const [gender, setGender] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser();
        setName(user.name!);
        const userGender = await getUserGender();
        setGender(userGender.gender!);
      } catch (error) {
        console.error("error", error);
        setName(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      <div>Hello, {name ? name : "Guest"}!</div>
      <div>Gender: {gender ? gender : "NA"}</div>
    </div>
  );
};