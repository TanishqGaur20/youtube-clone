import React from "react";
import { useState, useEffect, Suspense } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

// Lazy load components
const Navbar = React.lazy(() => import("./Components/Navbar"));
const Home = React.lazy(() => import("./Pages/Home"));
const VideoPage = React.lazy(() => import("./Pages/VideoPage"));
const Login = React.lazy(() =>
  import("./Components/LoginForm").then((module) => ({ default: module.Login }))
); // Correct lazy loading for named export
const Register = React.lazy(() =>
  import("./Components/RegisterForm").then((module) => ({
    default: module.Register,
  }))
); // Correct lazy loading for named export
const CreateChannel = React.lazy(() => import("./Components/CreateChannel"));
const ChannelPage = React.lazy(() => import("./Components/ChannelPage"));
const AddVideo = React.lazy(() => import("./Components/AddVideo"));

function App() {
  const navigate = useNavigate();
  const [userPic, setUserPic] = useState(
    "https://www.pngitem.com/pimgs/m/130-1300253_female-user-icon-png-download-user-image-color.png"
  ); // default picture for logged-out user
  const [isLoggedIn, setIsLoggedIn] = useState(false); // track login state
  const [sideNavbar, setSideNavbar] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    const channelName = localStorage.getItem("channelName"); // Retrieve channel name

    if (token && email) {
      setIsLoggedIn(true); // If token and username exist in localStorage, the user is logged in
      setUserPic(
        "https://www.pngitem.com/pimgs/m/130-1300253_female-user-icon-png-download-user-image-color.png"
      ); // Set user profile picture
    }
  }, []);

  function handleLogout() {
    setIsLoggedIn(false);
    setUserPic(
      "https://www.pngitem.com/pimgs/m/130-1300253_female-user-icon-png-download-user-image-color.png"
    );
    localStorage.removeItem("userName");
    localStorage.removeItem("email");
    localStorage.removeItem("token");

    navigate("/"); // redirect to homepage after logout
  }

  return (
    <div>
      {/* Suspense for Navbar */}
      <Suspense fallback={<div>Loading Navbar...</div>}>
        <Navbar
          setSideNavbarfunc={() => setSideNavbar((prev) => !prev)}
          sideNavbar={sideNavbar}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          userPic={userPic}
          isLoggedIn={isLoggedIn} // pass login state
          handleLogout={handleLogout} // Pass logout state
        />
      </Suspense>

      {/* Suspense for Routes */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={<Home sideNavbar={sideNavbar} searchTerm={searchTerm} />}
          />
          <Route
            path="/videos/:id"
            element={<VideoPage sideNavbar={sideNavbar} />}
          />
          <Route
            path="/login"
            element={
              <Login
                sideNavbar={sideNavbar}
                setUserPic={setUserPic}
                handleLoginSuccess={() => setIsLoggedIn(true)}
              />
            }
          />
          <Route
            path="/register"
            element={<Register sideNavbar={sideNavbar} />}
          />
          <Route
            path="/createchannel"
            element={<CreateChannel sideNavbar={sideNavbar} />}
          />
          <Route
            path="/channelpage"
            element={<ChannelPage sideNavbar={sideNavbar} />}
          />
          <Route
            path="/addvideo"
            element={<AddVideo sideNavbar={sideNavbar} />}
          />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
