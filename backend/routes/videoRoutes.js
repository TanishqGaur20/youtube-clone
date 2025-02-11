import {
  getVideos,
  addVideo,
  deleteVideo,
  particularVideo,
  editVideo,
} from "../controllers/videoController.js";

export function videoRoutes(app) {
  app.get("/videos", getVideos);

  app.get("/videos/:id", particularVideo);

  app.post("/addvideo", addVideo);

  app.delete("/deletevideo", deleteVideo);

  app.put("/editvideo/:id", editVideo);
}
