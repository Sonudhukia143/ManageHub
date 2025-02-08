import {  createContext,useContext,useReducer } from "react";

const LOGIN = "LOGIN";
const SIGNIN = "SIGNIN";
const LOGOUT = "LOGOUT";
const initialState = {
  isLoggedIn: false,
  user: null,
}

const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem('gmail',action.payload.user.gmail);
      localStorage.setItem('token',action.payload.token);
      return { ...state, isLoggedIn: true, token: action.payload.token  };
    case LOGOUT:
      localStorage.removeItem('token');
      localStorage.clear();
      return { ...state, isLoggedIn: false, token: null };
    case SIGNIN:
      localStorage.setItem('gmail',action.payload.user.gmail);
      localStorage.setItem('token',action.payload.token);
      return { ...state, isLoggedIn: true, token: action.payload.token };
    default:
      return state;
  }
};

const AuthContext = createContext();

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}

export const AuthProvider = ({children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  return (
    <AuthContext.Provider value={{ state , dispatch }} >
      {children}
    </ AuthContext.Provider>
  )
}
