import axios from "axios";

export const signUp = async (email, password) => {
  try {
    const response = await axios({
      method: "post",
      url: "/users/create",
      baseURL: "http://localhost:8080",
      timeout: 10000,
      headers: {
        "Content-type": "application/json",
      },
      data: JSON.stringify({
        email,
        password,
      }),
    });

    return response.data;
  } catch (error) {
    console.error(error.response.data);
    return error.response.data;
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios({
      method: "post",
      url: "/users/login",
      baseURL: "http://localhost:8080",
      timeout: 10000,
      headers: {
        "Content-type": "application/json",
      },
      data: JSON.stringify({
        email,
        password,
      }),
    });

    return response.data;
  } catch (error) {
    console.error(error.response.data);
    return error.response.data;
  }
};

export const createTodo = async (title, content) => {
  try {
    const response = await axios({
      method: "post",
      url: "/todos",
      baseURL: "http://localhost:8080",
      timeout: 10000,
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("user-token"),
      },
      data: JSON.stringify({
        title,
        content,
      }),
    });

    return response.data;
  } catch (error) {
    console.error(error.response.data);
    return error.response.data;
  }
};

export const deleteTodo = async (id) => {
  try {
    const response = await axios({
      method: "delete",
      url: `/todos/${id}`,
      baseURL: "http://localhost:8080",
      timeout: 10000,
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("user-token"),
      },
    });

    return response.data;
  } catch (error) {
    console.error(error.response.data);
    return error.response.data;
  }
};

export const getTodoById = async (id) => {
  try {
    const response = await axios({
      method: "get",
      url: `/todos/${id}`,
      baseURL: "http://localhost:8080",
      timeout: 10000,
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("user-token"),
      },
    });

    return response.data;
  } catch (error) {
    console.error(error.response.data);
    return error.response.data;
  }
};

export const updateTodo = async (todoId, title, content) => {
  try {
    const response = await axios({
      method: "put",
      url: `/todos/${todoId}`,
      baseURL: "http://localhost:8080",
      timeout: 10000,
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("user-token"),
      },
      data: JSON.stringify({
        title,
        content,
      }),
    });

    return response.data;
  } catch (error) {
    console.error(error.response.data);
    return error.response.data;
  }
};
