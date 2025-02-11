import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import MenuIcon from "@mui/icons-material/Menu";
import YouTubeIcon from "@mui/icons-material/YouTube";
import SearchIcon from "@mui/icons-material/Search";

//component navbar containing search function and profile icon
function Navbar({
  setSideNavbarfunc,
  sideNavbar,
  searchTerm,
  setSearchTerm,
  userPic,
  isLoggedIn,
  handleLogout,
}) {
  const navigate = useNavigate();
  const [navbarProfile, setNavbarProfile] = useState(false);

  function handleClickProfile() {
    setNavbarProfile((prev) => !prev);
  }

  function handleLogoClick() {
    navigate("/");
  }

  function handleLoginClick() {
    navigate("/login");
  }

  function handleRegisterClick() {
    navigate("/register");
  }

  function handleChannelClick() {
    // Check if the user already has a channel
    const channelName = localStorage.getItem("channelName");

    if (channelName) {
      // If channel exists, go to the user page
      navigate("/channelpage");
    } else {
      // If no channel exists, redirect to create channel page
      navigate("/createchannel");
    }
  }

  return (
    <div className="navbar h-[10vh] px-5 box-border pt-[5px] pb-[8px] flex items-center w-[100%] space justify-between top-0 fixed bg-black z-10">
      <div className="navbar-left gap-3 flex justify-center items-center w-fit">
        <div
          className="menuicon w-10 h-10 pt-1 pl-1 z-50 flex justify-center items-center cursor-pointer  "
          onClick={setSideNavbarfunc}
        >
          <MenuIcon sx={{ color: "white" }} />
        </div>
        <div
          className="youtubeicon flex justify-center items-center cursor-pointer text-white"
          onClick={handleLogoClick}
        >
          <YouTubeIcon sx={{ fontSize: "34px" }} className="text-red-600" />
          <div className="youtubetitle hidden md:block z-50">YouTube</div>
        </div>
      </div>
      <div className="navbar-middle flex gap-3 w-[50%]">
        <div className="navsearch w-[100%] flex">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            className="searchbar w-[90%] h-[40px] rounded-l-2xl  border border-solid border-[rgb(58,57,57)] bg-black text-white text-lg pl-7"
          />
          <div className="searchicon cursor-pointer w-[70px]  border border-solid border-[rgb(42,42,42)] bg-[rgb(42,42,42)] flex justify-center items-center rounded-r-2xl">
            <SearchIcon sx={{ fontSize: "28px", color: "white" }} />
          </div>
        </div>
      </div>
      <div className="navbar-right flex gap-5 justify-center items-center relative">
        <VideoCallIcon
          sx={{ fontSize: "30px", cursor: "pointer", color: "white" }}
        />
        <img
          onClick={handleClickProfile}
          src={userPic}
          alt="login"
          className="navbar-login w-[30px] rounded-[50%] cursor-pointer "
        />
        {navbarProfile && (
          <div className="profilediv absolute top-9 w-[100%] z-20 right-1 text-white">
            {isLoggedIn ? (
              <>
                <div
                  className="px-4 py-3 text-white cursor-pointer hover:bg-gray-700 rounded-t-lg"
                  onClick={handleChannelClick}
                >
                  Channel
                </div>
                <div
                  className="px-4 py-3 text-white cursor-pointer hover:bg-red-600 rounded-b-lg"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </>
            ) : (
              <>
                <div
                  className="px-4 py-3 text-white cursor-pointer hover:bg-gray-700 rounded-t-lg"
                  onClick={handleLoginClick}
                >
                  Login
                </div>
                <div
                  className="px-4 py-3 text-white cursor-pointer hover:bg-green-600 rounded-b-lg"
                  onClick={handleRegisterClick}
                >
                  Register
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
