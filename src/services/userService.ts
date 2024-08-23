export interface User {
  name?: string;
  gender?: string;
}

export const getUser = async (): Promise<User> => {
  return { name: "Vandana Bisht" };
};

export const getUserGender = async (): Promise<User> => {
  return { gender: "Female" };
};