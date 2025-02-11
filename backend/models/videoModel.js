import mongoose from "mongoose";

const videoSchema = mongoose.Schema({
  videoId: { type: String },
  url: { type: String },
  title: { type: String },
  thumbnail: { type: String },
  description: { type: String },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  uploadDate: { type: String },
  genre: { type: String },
  channelId: { type: String },
  uploader: { type: String },

  owner: { type: String, default: "" },
});

// Create a video model
const Video = mongoose.model("Video", videoSchema);

export default Video;
