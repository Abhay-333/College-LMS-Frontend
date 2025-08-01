import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const dataContext = createContext();

function UserContext({ children }) {
  const navigation = useNavigate();
  const serverUrl = import.meta.env.VITE_API_URL || "https://college-lms-backend.onrender.com/api";
  const [userData, setUserData] = useState(null);
  const getUserData = async () => {
    try {
      let { data } = await axios.get(serverUrl + "/getUser", {
        withCredentials: true,
      });
      console.log(data);
      setUserData(data);
    } catch (err) {
      console.log("getUserData error:", err);
      // Temporarily comment out the redirect to debug
      navigation("/signIn");
    }
  };
  const value = {
    serverUrl,
    userData,
    getUserData,
    setUserData
  };
  return <dataContext.Provider value={value}>{children}</dataContext.Provider>;
}

export default UserContext;
