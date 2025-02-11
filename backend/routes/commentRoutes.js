import { getComment, addComment } from "../controllers/commentController.js";

export function commentRoutes(app) {
  app.get("/comment", getComment);
  app.post("/comment", addComment);
}
