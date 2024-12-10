// src/redux/reducers/authReducer.js

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  error: null,
  schoolName: null,
  student: null,
  category: null,
  setid: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.username,
        setid: action.payload.setid,
        token: action.payload.token,
        error: null,
        schoolName: action.payload.schoolName,
        student: action.payload.student,
        category: action.payload.category,
      };

    case "LOGIN_FAILURE":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload,
      };

    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        error: null,
      };

    default:
      return state;
  }
};

export default authReducer;
