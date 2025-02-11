import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

export function Register({ sideNavbar }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e) {
    e.preventDefault();

    if (!email.includes("@") || !email.includes(".com")) {
      alert("Enter a valid email address.");
      return;
    }
    if (!username || !email || !password) {
      alert("All fields are required.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Registration failed: ${errorData.message || "Unknown error"}`);
        return;
      }

      const data = await response.json();
      if (data.message === "User registered successfully") {
        navigate("/login");
      }
    } catch (error) {
      alert("There was an issue registering. Please try again.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Sidebar sideNavbar={sideNavbar} />
      <form
        className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 space-y-6"
        onSubmit={handleRegister}
      >
        <h1 className="text-3xl font-semibold text-gray-800 text-center">
          Register
        </h1>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full p-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition"
        >
          Register
        </button>
        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <span
            className="text-blue-600 font-bold cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login here
          </span>
        </p>
      </form>
    </div>
  );
}

export default Register;
