import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

//componenet for creation of channel
export function CreateChannel({ sideNavbar }) {
  const navigate = useNavigate();
  const [channelName, setChannelName] = useState("");
  const [channelDescription, setChannelDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const token = localStorage.getItem("token");
  const savedChannelName = localStorage.getItem("channelName");

  if (!token) {
    navigate("/login");
    return;
  }

  if (savedChannelName) {
    navigate("/channelpage");
    return;
  }

  async function createChannelHandler(e) {
    e.preventDefault();

    if (!channelName || !channelDescription) {
      setErrorMessage("Both Channel Name and Description are required.");
      return;
    }

    const email = localStorage.getItem("email");

    if (!email) {
      setErrorMessage("Email is required to create a channel.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}createchannel`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
          },
          body: JSON.stringify({
            email,
            channelName,
            channelDescription,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create channel");
      }

      const result = await response.json();

      if (result.success || response.status === 201) {
        alert("Channel created successfully");
        console.log("Saving Channel Name to localStorage:", channelName);

        localStorage.setItem("channelName", channelName);
        navigate("/channelpage");
      } else {
        setErrorMessage(result.message || "An unknown error occurred.");
      }
    } catch (error) {
      console.error("Error during channel creation:", error);
      setErrorMessage("Error creating channel. Please try again.");
    }
  }

  return (
    <div className="pt-[4vh]">
      <Sidebar sideNavbar={sideNavbar} />
      <div className="w-full h-screen flex justify-center items-center  bg-black">
        <form
          className="border border-white rounded-lg w-[50%] p-[5%] flex flex-col gap-10 justify-center items-center"
          onSubmit={createChannelHandler}
        >
          <h1 className="text-2xl  text-white">
            Add Channel Details
          </h1>
          {errorMessage && <div className="text-red-600">{errorMessage}</div>}
          <input
            type="text"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            placeholder="Channel Name"
            className="w-[70%] text-xl p-[5px] rounded-lg text-black"
          />
          <textarea
            value={channelDescription}
            onChange={(e) => setChannelDescription(e.target.value)}
            placeholder="Channel Description"
            className="w-[70%] text-xl p-[5px] rounded-lg text-black"
          />
          <button
            type="submit"
            className=" bg-blue-600 text-white  w-[70%] text-xl p-[5px] rounded-lg"
          >
            Create Channel
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateChannel;
