import { useState, useEffect } from "react";

//component which retrieves comment from the database
export function Comments(props) {
  const userName = localStorage.getItem("userName");
  const email = localStorage.getItem("email");

  const [comment, setComment] = useState("");
  const [reload, setReload] = useState(true);
  const id = props.id;

  const [data, setData] = useState(null);

  useEffect(() => {
    async function retrieve() {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}comment`
      );
      const result = await response.json();
      setData(result);
    }
    retrieve();
  }, [reload]);

  async function handleSubmitComment() {
    if (comment === "") {
      return;
    }

    const saveUser = await fetch(`${import.meta.env.VITE_BACKEND_URL}comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: userName,
        email: email,
        commentData: comment,
        videoId: id,
      }),
    });

    const message = await saveUser.json();
    setComment("");
    setReload(!reload);
  }

  return (
    <div className="flex flex-col justify-center items-center gap-6 pb-8 w-full max-w-2xl mx-auto">
      {email ? (
        <div className="w-full flex flex-col gap-3">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black resize-none"
            placeholder="Write a comment..."
            rows="3"
          />
          <button
            onClick={handleSubmitComment}
            className="w-fit self-end bg-blue-600 hover:bg-blue-700 transition text-white text-lg px-6 py-2 rounded-md shadow-md"
          >
            Add Comment
          </button>
        </div>
      ) : (
        <h1>Login To add Comment</h1>
      )}

      {/* Display comments for the video */}
      <div className="w-full flex flex-col gap-4 mt-4">
        {data &&
          data
            .filter((e) => id === e.videoId)
            .map((e) => (
              <div
                key={e._id}
                className="flex items-center gap-4 bg-gray-100 p-4 rounded-lg shadow-md"
              >
                {/* Comment Details */}
                <div className="flex flex-col">
                  <span className="text-gray-900 font-semibold">
                    {e.userName}
                  </span>
                  <span className="text-gray-700">{e.commentData}</span>
                  <span className="text-gray-500 text-sm">Recently</span>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
