import axios from "axios";

// Action to handle successful login
const loginSuccess = (userData) => ({
  type: "LOGIN_SUCCESS",
  payload: {
    username: userData.username,
    token: userData.token,
  },
});

const loginFailure = (error) => ({
  type: "LOGIN_FAILURE",
  payload: error,
});

export const loginUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:7009/api/auth/login",
      userData
    );
    dispatch(loginSuccess(response.data));
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Login failed. Please try again.";
    dispatch(loginFailure(errorMessage));
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: "LOGOUT" });
};
