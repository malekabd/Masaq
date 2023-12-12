import Announcement from "../models/announcementModal.js";

export const addAnnouncement = async (req, res, next) => {
  try {
    const newAnnouncement = new Announcement(req.body);
    await newAnnouncement.save();

    res.status(200).json({
      status: "success",

      newAnnouncement,
    });
    next();
  } catch (error) {
    res
      .status(500)
      .json({ code: "500", status: " Bad Request", message: error.message });
    next();
  }
};
export const getAllAnnouncement = async (req, res, next) => {
  try {
    // Use the find method to retrieve all documents from the collection
    const announcements = await Announcement.find();
    res.status(200).json({
      status: "success",

      announcements,
    });
  } catch (error) {
    res
      .status(500)
      .json({ code: "500", status: " Bad Request", message: error.message });
    next();
  }
};

export const deleteAnnouncement = async (req, res, next) => {
  const { _id } = req.body;

  try {
    const validAnnouncement = await Announcement.findOneAndRemove({ _id });
    if (!validAnnouncement)
      return res.status(404).json({
        code: "404",
        status: "Fail",
        message: "Announcement does not  exist",
      });
    res.status(202).json({ status: "success" });
  } catch (error) {
    res
      .status(500)
      .json({ code: "500", status: " Bad Request", message: error.message });
    next();
  }
};
