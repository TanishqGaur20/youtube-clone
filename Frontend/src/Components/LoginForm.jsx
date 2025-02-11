import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

export function Login({ setUserPic, handleLoginSuccess, sideNavbar }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login(e) {
    e.preventDefault();

    if (!email || !password) {
      alert("All fields are necessary");
      return;
    }

    try {
      console.log("Logging in with", email, password);

      const saveUser = await fetch(`${import.meta.env.VITE_BACKEND_URL}login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      console.log("Login response status:", saveUser.status);

      if (!saveUser.ok) {
        throw new Error("Failed to login");
      }

      const message = await saveUser.json();
      console.log("Server Response:", message);

      if (message.token) {
        console.log("Token received:", message.token);

        localStorage.setItem("email", message.email);
        localStorage.setItem("token", message.token);
        localStorage.setItem("channelName", message.channelName); // Store channel name

        setUserPic(
          "https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face.png"
        );

        alert(message.message);
        handleLoginSuccess();
        navigate("/");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("There was an issue logging in. Please try again.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Sidebar sideNavbar={sideNavbar} />
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-semibold text-blue-600 text-center mb-6">
          Login
        </h1>
        <form className="flex flex-col gap-5" onSubmit={login}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
