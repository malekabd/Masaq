import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
  {
    announcement: {
      type: String,
      required: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);

const Announcement = mongoose.model("Announcement", announcementSchema);

export default Announcement;
