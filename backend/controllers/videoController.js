import Video from "../models/videoModel.js";

// Get all videos
export async function getVideos(req, res) {
  try {
    res.status(200).json(await Video.find());
  } catch (error) {
    res.status(500).json({ message: "Error fetching videos", error });
  }
}

// Get a specific video by ID
export async function particularVideo(req, res) {
  try {
    const video = await Video.findById(req.params.id);
    video
      ? res.status(200).json(video)
      : res.status(404).json({ message: "Video not found" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

// Add a new video
export async function addVideo(req, res) {
  try {
    const newVideo = new Video(req.body);
    await newVideo.save();
    res.status(201).json({ message: "Video added" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Delete a video by ID
export async function deleteVideo(req, res) {
  try {
    await Video.deleteOne({ _id: req.body.id });
    res.status(200).json({ message: "Video deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Edit a video
export async function editVideo(req, res) {
  try {
    const updatedVideo = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });

    updatedVideo
      ? res.json({ success: true, message: "Video updated", video: updatedVideo })
      : res.status(404).json({ success: false, message: "Video not found" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
