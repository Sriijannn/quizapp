// src/redux/actions/authActions.js
export const loginUser = (credentials) => {
  return async (dispatch) => {
    try {
      // Simulate an API call
      const userData = {
        username: credentials.username,
        token: "fake_jwt_token", // In real cases, this would come from your API
      };

      // Dispatch the login action
      dispatch({
        type: "LOGIN",
        payload: userData,
      });

      // Store token in localStorage (optional)
      localStorage.setItem("token", userData.token);
    } catch (error) {
      console.error("Login failed:", error);
      // You can dispatch a LOGIN_FAIL action here if needed
    }
  };
};
