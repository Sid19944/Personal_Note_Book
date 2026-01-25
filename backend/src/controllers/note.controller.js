import { asyncHandler } from "../utils/asyncHandler.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { Note } from "../models/notes.schema.js";
import axios from "axios";

const getAllNotesOfAUser = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;

  const notes = await Note.find({ userId: _id });
  if (!notes.length) {
    return res
      .status(200)
      .json({ success: true, message: "Note not created yet!" });
  }

  return res.status(200).json({
    success: true,
    message: `Notes fetched successfully`,
    notes,
  });
});

const getSingleNote = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const note = await Note.findById(id);
  if (!note) {
    return next(new ErrorHandler("Invalid Note ID", 400));
  }
  return res.status(200).json({
    success: true,
    message: "Note found",
    note,
  });
});

const createNewNote = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;

  const { content, title } = req.body;
  const finalTitle = title?.trim() || "Default"

  if (!content) {
    return next(new ErrorHandler("Please Provide content for note", 400));
  }
  const note = await Note.create({
    userId: _id,
    title : finalTitle,
    content,
  });
  if (!note) {
    return next(new ErrorHandler("Something went wrong", 500));
  }
  return res.status(200).json({
    success: true,
    message: "New Note Created",
    note,
  });
});

const updateNote = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const newNote = {
    title: req?.body?.title?.trim() || "Default",
    content: req?.body?.content,
  };
  
  const note = await Note.findByIdAndUpdate(id, newNote, { new: true });

  if (!note) {
    return next(
      new ErrorHandler("Something went wrong while update note", 500),
    );
  }
  return res.status(200).json({
    success: true,
    message: "Note updated successfully",
    note,
  });
});

const deleteNote = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const note = await Note.findByIdAndDelete(id);
  if (!note) {
    return next(new ErrorHandler("Invalid ID", 400));
  }
  return res.status(200).json({
    success: true,
    message: "Note deleted successfully",
    note,
  });
});

const noteSummarisation = asyncHandler(async (req, res, next) => {
  const { note } = req.body;

  if (!note) {
    return res.status(400).json({ message: "Note is required" });
  }

  try {
    const response = await axios.post("https://router.huggingface.co", {
      headers: {
        Authorization: `Bearer ${process.env.HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: note,
        parameters: {
          max_length: 120,
          min_length: 40,
        },
      }),
    });

    const data = await response.json();

    // Handle model loading case
    if (data.error) {
      return res.status(503).json({
        message: "Model is loading, try again in a few seconds",
      });
    }

    res.json({
      summary: data[0].summary_text,
    });
  } catch (err) {
    res.status(500).json({ message: "Summarization failed" });
  }
});

export {
  createNewNote,
  getAllNotesOfAUser,
  updateNote,
  deleteNote,
  getSingleNote,
  noteSummarisation,
};
