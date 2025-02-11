import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../utils/useFetch";

//component HomePage it has sideNavbar genre option and video cards basically our main page
function HomePage({ sideNavbar, searchTerm }) {
  const navigate = useNavigate();
  const {
    data: videos,
    loading,
    error,
  } = useFetch(`${import.meta.env.VITE_BACKEND_URL}videos`);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const options = [
    "All",
    "Vlog",
    "Gaming",
    "Comedy",
    "Documentary",
    "Music",
    "Forest",
    "Travel",
  ];

  if (loading)
    return (
      <div className="flex justify-center items-center w-[100vw] h-[100vh]">
        <div className="w-16 h-16 border-4 border-blue-800 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );

  if (error) return <div className="text-white">Error loading videos</div>;

  let filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedGenre !== "All") {
    filteredVideos = filteredVideos.filter((video) =>
      video.genre.toLowerCase().includes(selectedGenre.toLowerCase())
    );
  }
  const formatNumber = (num) => {
    return num >= 1000 ? Math.floor(num / 1000) + "K" : num;
  };

  const randomNumber = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);
  const views = randomNumber(10_000, 500_000); // Random views between 10K and 500K
  const likes = randomNumber(1_000, 50_000); // Random likes between 1K and 50K

  return (
    <div
      className={
        "sideNavbar fullhomepage flex flex-col overflow-x-hidden flex-[1] ml-[0px] min-h-[100vh]"
      }
    >
      <div className="homepage_options flex fixed top-[74px] pl-[400px] z-[1] w-[100vw] box-border gap-2  h-[10vh] justify-center items-center overflow-x-auto bg-black lg:top-[8vh] md:top-[76px]  lg:pl-30 md:pl-12">
        {options.map((item, index) => (
          <div
            key={index}
            className={`hompage_option flex-shrink-0 flex-grow-0 basis-auto h-[30px] py-1 px-[10px] bg-[rgb(42,42,42)] text-white font-semibold rounded-[5px] flex justify-center items-center cursor-pointer ${
              selectedGenre === item ? "bg-blue-600" : ""
            }`}
            onClick={() => setSelectedGenre(item)}
          >
            {item}
          </div>
        ))}
      </div>

      {/* Video List */}
      <div className="pt-[4vh]">
        <div className="video-list  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 pt-20 pr-4 pl-4 md:pr-20 md:pl-20 ">
          {filteredVideos.map((video) => {
            const videoOwner = video.owner || "Amank";
            return (
              <div
                key={video._id}
                className="video-card bg-white text-black p-2 rounded-md overflow-hidden cursor-pointer transition-all duration-200"
                onClick={() => navigate(`/videos/${video._id}`)}
              >
                <div className="thumbnail-container w-full h-[180px]">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full hover:opacity-85 h-full object-cover rounded-md"
                  />
                </div>
                <div className="video-info p-4">
                  <h3 className="video-title text-xl font-semibold truncate">
                    {video.title}
                  </h3>
                  <div className="video-stats text-sm mt-2 text-gray-400">
                    <span className="video-views">
                      {formatNumber(views)} views •{" "}
                    </span>
                    <span className="video-likes">
                      {formatNumber(likes)} likes
                    </span>{" "}
                  </div>
                  <div className="video-owner text-gray-500 mt-2">
                    {videoOwner}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
