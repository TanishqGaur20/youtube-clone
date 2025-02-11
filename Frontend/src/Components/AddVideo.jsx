import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

export function AddVideo({ sideNavbar }) {
  const navigate = useNavigate();

  const [videoId, setVideoId] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");

  // Function to handle video submission
  async function submit(e) {
    e.preventDefault();
    const owner = localStorage.getItem("email");

    if (
      videoId === "" ||
      title === "" ||
      url === "" ||
      thumbnail === "" ||
      description === "" ||
      genre === ""
    ) {
      alert("Fields cannot be empty");
      return;
    }

    if (videoId.includes(" ")) {
      alert("Video ID cannot have a space");
      return;
    }

    const saveUser = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}addvideo`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          videoId,
          title,
          url,
          thumbnail,
          description,
          genre,
          owner,
        }),
      }
    );

    const message = await saveUser.json();
    console.log(message);

    if (message.message.toLowerCase() === "video added") {
      navigate("/channelpage");
      setTimeout(() => {
        navigate("/channelpage"); // navigate back to the user page
      }, 1000);
    }
  }

  return (
    <div className="w-[100%] h-[100vh] flex justify-center items-center pt-16 bg-black">
      <Sidebar sideNavbar={sideNavbar} />
      <form className="border border-white  w-[50%] p-[5%] flex flex-col gap-2 justify-center items-center">
        <h1 className="text-2xl font-bold text-white">Add Video Details</h1>
        <input
          type="text"
          onChange={(e) => setVideoId(e.target.value)}
          placeholder="Video ID"
          className="w-[70%] text-md p-[5px]  text-black"
        />
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-[70%] text-md p-[5px]  text-black"
        />
        <input
          type="text"
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter Video URL"
          className="w-[70%] text-md p-[5px]  text-black"
        />
        <input
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-[70%] text-md p-[5px]  text-black"
        />
        <input
          type="text"
          onChange={(e) => setThumbnail(e.target.value)}
          placeholder="Enter Thumbnail URL"
          className="w-[70%] text-md p-[5px]  text-black"
        />
        <input
          type="text"
          onChange={(e) => setGenre(e.target.value)}
          placeholder="Category"
          className="w-[70%] text-md p-[5px]  text-black"
        />
        <button
          type="submit"
          onClick={(e) => submit(e)}
          className="bg-blue-600 text-white font-bold w-[70%] text-md p-[5px] "
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddVideo;
