import { http, HttpResponse } from "msw";

const users = [
  { id: 1, firstName: "John", lastName:"Doe", email: "john@example.com" },
  { id: 2, firstName: "Jane", lastName:"Smith", email: "jane@example.com" },
];

export const restHandlers = [
  http.get("https://dummyjson.com/users", () => {
    return HttpResponse.json(users);
  }),
];