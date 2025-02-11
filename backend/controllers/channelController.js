import user from "../models/userModel.js";

// Controller to create a channel
export async function createChannel(req, res) {
  try {
    const { email, channelName } = req.body;

    await user.updateOne(
      { email: email },
      { $set: { channelName: channelName } }
    );

    res.status(201).json({ message: "Channel created" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// Controller to edit a channel
export async function editChannel(req, res) {
  try {
    const { email, newChannelName } = req.body;

    const updatedUser = await user.findOneAndUpdate(
      { email: email },
      { $set: { channelName: newChannelName } }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Channel updated", channel: updatedUser });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// Controller to delete a channel
export async function deleteChannel(req, res) {
  try {
    const { email } = req.body;

    await user.updateOne({ email: email }, { $set: { channelName: "" } });

    res.status(200).json({ message: "Channel deleted" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
