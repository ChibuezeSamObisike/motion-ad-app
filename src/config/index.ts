import dotenv from "dotenv";
dotenv.config();

const config = {
  backendUrl: "https://motion365-a63846f84620.herokuapp.com/api/v1",
};

export default config;

export const QUERY_KEY = {
  todos: "todos",
  user: "user",
};
