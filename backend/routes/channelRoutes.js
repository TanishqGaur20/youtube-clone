import {
  createChannel,
  deleteChannel,
  editChannel,
} from "../controllers/channelController.js";
import { verifyToken } from "../middlewares/verify.js";

// routes for all channel related actions
export function channelRoutes(app) {
  app.put("/createchannel", verifyToken, createChannel);

  app.put("/deletechannel", verifyToken, deleteChannel);

  app.put("/editChannel", editChannel);
}
