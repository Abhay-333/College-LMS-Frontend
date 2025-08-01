import axios from "axios";
import { dataContext } from "../../Utils/UserContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomPopUp from "./CustomPopUp";

const SignIn = () => {
  const [userType, setUserType] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigate();
  const { serverUrl, getUserData } = useContext(dataContext);
  const [errorMsg, setErrorMsg] = useState("");
  const [showPopUp, setShowPopUp] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // Regex patterns
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/;

    // Validation checks
    if (!trimmedEmail || !trimmedPassword) {
      setShowPopUp(true);
      setErrorMsg("Please fill in all required fields");
      return;
    }

    if (!emailRegex.test(trimmedEmail)) {
      setShowPopUp(true);
      setErrorMsg("Please Enter valid email address");
      return;
    }

    if (!passwordRegex.test(trimmedPassword)) {
      setShowPopUp(true);
      setErrorMsg(
        "Password must be at least 6 characters with at least one letter and one number"
      );
      return;
    }

    if (email.trim() === "" || password.trim() === "") {
      alert("Please enter valid information");
      return;
    }

    console.log("Role:", userType, "Email:", email, "Password:", password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Role</label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="w-full p-2 border rounded mt-1"
            >
              <option value="default">Select</option>
              <option value="student">Student</option>
              <option value="admin">Faculty</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter your Email"
              required
              // pattern="^\d+$"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            onClick={async () => {
              await axios
                .post(
                  serverUrl + "/login",
                  { email, password },
                  { withCredentials: true }
                )
                .then(async (e) => {
                  console.log(e);
                  await getUserData();
                  navigation("/");
                })
                .catch((err) => {
                  setErrorMsg(
                    err.response?.data?.message || "Login failed. Try again."
                  );
                  setShowPopUp(true);
                  console.log(err);
                });
            }}
          >
            Sign In
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => {
              navigation("/signUp");
            }}
          >
            SignUp
          </span>
        </p>
      </div>
      {showPopUp && (
        <CustomPopUp
          message={errorMsg}
          onClose={() => setShowPopUp(false)}
        ></CustomPopUp>
      )}
    </div>
  );
};

export default SignIn;
