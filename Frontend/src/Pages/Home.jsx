import React from "react";
import HomePage from "../Components/HomePage";
import Sidebar from "../Components/Sidebar";

//page home containg navbar sidebar homepage component to render our home screen
function Home({ sideNavbar, searchTerm }) {
  return (
    <div className="home flex w-[100%] pr-[13px] pt-[40px] box-border bg-black">
      <Sidebar sideNavbar={sideNavbar} />
      <HomePage sideNavbar={sideNavbar} searchTerm={searchTerm} />
    </div>
  );
}

export default Home;
