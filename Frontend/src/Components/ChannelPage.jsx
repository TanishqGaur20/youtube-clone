import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

//component which shows channel page
export function ChannelPage({ sideNavbar }) {
  const navigate = useNavigate();
  const [reload, setReload] = useState(true);
  const [data, setData] = useState(null);
  const [editingVideo, setEditingVideo] = useState(null); // to track which video is being edited
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedGenre, setEditedGenre] = useState("");
  const [isEditingChannel, setIsEditingChannel] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");

  const userName = localStorage.getItem("userName");
  const email = localStorage.getItem("email");
  const JWT = localStorage.getItem("token");
  const channelName = localStorage.getItem("channelName");

  // redirect if not logged in or channel name is not set
  useEffect(() => {
    console.log("JWT:", JWT);
    console.log("Channel Name from LocalStorage:", channelName);
  }, [JWT, channelName]);

  // fetch all videos from the API
  useEffect(() => {
    async function retrieve() {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}videos`);
      const result = await response.json();
      console.log(result);
      setData(result);
    }
    retrieve();
  }, [reload]);

  // loading state animation
  if (!data) {
    return (
      <div>
        <div className="flex justify-center items-center h-screen">
          <div className="w-16 h-16 border-4 border-blue-800 border-t-transparent border-solid rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  async function handleEditChannel() {
    if (!newChannelName.trim()) return alert("Channel name cannot be empty.");

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}editChannel`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `JWT ${JWT}`,
        },
        body: JSON.stringify({
          email: email,
          newChannelName: newChannelName,
        }),
      }
    );

    const result = await response.json();
    console.log(result);
    if (response.status == 200) {
      localStorage.setItem("channelName", newChannelName);
      alert("Channel name updated successfully!");
      setIsEditingChannel(false);
      setReload(!reload);
    } else {
      alert("Error updating channel name.");
    }
  }

  // Function to handle deleting a video
  async function handleVideoDelete(videoId, event) {
    event.stopPropagation();

    const conf = confirm("Are you sure you want to DELETE the video?");
    if (conf === true) {
      const id =
        typeof videoId === "object" ? videoId.$oid || videoId._id : videoId;

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}deletevideo`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id, // Pass the id
          }),
        }
      );
      window.location.reload();
      const message = await response.json();
      if (message.message === "video deleted") {
        alert("Video deleted successfully!");
        setReload(!reload); // trigger a reload to refresh the video list
      } else {
        console.log("Error deleting video.");
      }
    }
  }

  function handleVideoClick(videoId) {
    navigate(`/videos/${videoId}`); // navigate to the video player page on click
  }

  // Function to handle editing a video
  function handleVideoEdit(video) {
    setEditingVideo(video); // Set the video to be edited
    setEditedTitle(video.title);
    setEditedDescription(video.description);
    setEditedGenre(video.genre);
  }

  // Function to save the edited video
  async function handleSaveEdit() {
    if (!editingVideo) return;

    const updatedVideo = {
      title: editedTitle,
      description: editedDescription,
      genre: editedGenre,
    };

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}editvideo/${editingVideo._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedVideo),
      }
    );

    const result = await response.json();
    console.log("result", result);
    if (result.success) {
      alert("Video updated successfully!");
      setReload(!reload);
      setEditingVideo(null);
    } else {
      alert("Error updating video.");
    }
  }

  const userVideos = data.filter(
    (video) => video.owner.toLowerCase() === channelName.toLowerCase()
  );

  // Handle the delete channel functionality
  async function handleDelete() {
    const choice = confirm("Are you sure you want to delete the channel?");
    if (choice === true) {
      const saveUser = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}deletechannel`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `JWT ${JWT}`,
          },
          body: JSON.stringify({
            email: email,
          }),
        }
      );
      window.location.reload();
      const message = await saveUser.json();

      if (message.message === "Channel deleted") {
        localStorage.removeItem("channelName"); // remove channel from localStorage
        alert("Channel deleted successfully.");
        setTimeout(() => {
          navigate("/"); // Redirect to homepage after deletion
        }, 1000);
      } else {
        console.log(message.message || "Error deleting channel");
      }
    }
  }

  return (
    <div className="pt-10 bg-black">
      <Sidebar sideNavbar={sideNavbar} />
      <div className="m-10  ">
        <div className="flex m-10 ml-[10%] bg-cover bg-no-repeat bg-center rounded-md ">
          <div className="rounded-[500px] mt-2 ml-4 overflow-hidden w-[100px] h-[100px]">
            <img
              src="https://www.pngitem.com/pimgs/m/130-1300253_female-user-icon-png-download-user-image-color.png"
              alt=""
              className="w-[100px] h-[100px]"
            />
          </div>
          <div className="flex flex-col justify-center items-start">
            <div className="text-3xl text-blue-600 capitalize font-semibold ml-[20px]">
              {channelName}
            </div>
            <div className="font-bold text-gray-400 ml-[20px]">0 Subs</div>
            <div className="flex flex-col md:flex-row md:gap-5 ml-5">
              <div
                onClick={() => setIsEditingChannel(true)}
                className="text-center border p-2 text-yellow-600 bg-white rounded-sm font-bold text-l cursor-pointer m-2"
              >
                Edit Channel
              </div>
              <div
                onClick={() => navigate("/addvideo")}
                className="text-center border p-2  text-blue-800 bg-white rounded-sm font-bold text-l cursor-pointer m-2 w-[100px]"
              >
                Add Video
              </div>
              <div
                onClick={handleDelete}
                className="text-center border p-2  text-blue-800 bg-white rounded-sm font-bold text-l cursor-pointer m-2"
              >
                Delete Channel
              </div>
            </div>
          </div>
        </div>
        <div className="border"></div>

        <div>
          <div className="m-10 text-2xl  text-purple-800">Uploads:</div>
          <div className="video-list  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pl-4">
            {userVideos.length === 0 ? (
              <div className="text-white text-center bg-black">
                No videos uploaded yet.
              </div>
            ) : (
              userVideos.map((video) => (
                <div
                  key={video._id}
                  className="video-card bg-black text-white rounded-md overflow-hidden cursor-pointer hover:bg-[rgb(28,28,28)] transition-all duration-200"
                  onClick={() => handleVideoClick(video._id)} // Navigate to the video player page on click
                >
                  <div className="thumbnail-container w-full h-[180px]">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div className="video-info p-4">
                    <h3 className="video-title text-xl font-semibold truncate">
                      {video.title}
                    </h3>
                    <div className="video-stats text-sm mt-2 text-gray-400">
                      <span className="video-views">
                        {video.views} views •{" "}
                      </span>
                      <span className="video-likes">{video.likes} likes</span>
                    </div>
                    <div className="video-owner text-gray-500 mt-2">
                      {video.owner}
                    </div>
                  </div>
                  <div className="video-actions mt-4 flex justify-between">
                    <button
                      onClick={(e) => handleVideoDelete(video._id, e)}
                      className="text-red-600 font-bold"
                    >
                      Delete Video
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // prevent video redirection
                        handleVideoEdit(video);
                      }}
                      className="text-blue-600 font-bold"
                    >
                      Edit Video
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingVideo && (
        <div className="modal fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md w-[400px]">
            <h2 className="text-xl font-semibold mb-4">Edit Video</h2>
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full p-2 mt-2 border border-gray-300 rounded-md"
            />
            <label className="block text-sm font-medium mt-4">
              Description
            </label>
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="w-full p-2 mt-2 border border-gray-300 rounded-md"
              rows="4"
            ></textarea>
            <label className="block text-sm font-medium mt-4">Genre</label>
            <input
              type="text"
              value={editedGenre}
              onChange={(e) => setEditedGenre(e.target.value)}
              className="w-full p-2 mt-2 border border-gray-300 rounded-md"
            />
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setEditingVideo(null)} // Close modal
                className="bg-gray-400 text-white py-2 px-4 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit} // Save changes
                className="bg-blue-600 text-white py-2 px-4 rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Edit Channel Modal */}
      {isEditingChannel && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md w-[400px]">
            <h2 className="text-xl font-semibold mb-4">Edit Channel Name</h2>
            <input
              type="text"
              value={newChannelName}
              onChange={(e) => setNewChannelName(e.target.value)}
              className="w-full p-2 mt-2 border border-gray-300 rounded-md"
              placeholder="Enter new channel name"
            />
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setIsEditingChannel(false)}
                className="bg-gray-400 px-4 py-2 rounded-md text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleEditChannel}
                className="bg-blue-600 px-4 py-2 rounded-md text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChannelPage;
