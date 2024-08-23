import { http, HttpResponse } from "msw";

const users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
];

export const restHandlers = [
  http.get("https://dummyjson.com/users", () => {
    return HttpResponse.json(users);
  }),
];