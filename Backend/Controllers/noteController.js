import e from "express";
import Note from "../Models/NoteModel.js";

// Create a new note
export const createNote = async (req, res) => {
  try {
    const { title, date, note } = req.body;
    const newNote = new Note({ title, date, note });
    await newNote.save();
    res.status(201).json({
      status: "success",
      message: "Note created successfully",
      Data: newNote,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error creating note",
      Data: null,
      error: error.message,
    });
  }
};

// Get all notes
export const getAllNotes = async (req, res) => {

  try {
    const notes = await Note.find();

    res.status(200).json({
      status: "success",
      message: "Notes retrieved successfully",
      Data: notes,
      error: null,
    });
  } catch (error) {

    res.status(500).json({
      status: "error",
      message: "Error retrieving notes",
      Data: null,
      error: error.message,
    });
  }
};

// Get a note by ID
export const getNoteById = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({
        status: "error",
        message: "Note not found",
        Data: null,
        error: "Note not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Note retrieved successfully",
      Data: note,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error retrieving note",
      Data: null,
      error: error.message,
    });
  }
};

// Update a note by ID
export const updateNoteById = async (req, res) => {
  const { id } = req.params;
  const { title, date, note } = req.body;
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, date, note },
      { new: true }
    );
    if (!updatedNote) {
      return res.status(404).json({
        status: "error",
        message: "Note not found",
        Data: null,
        error: "Note not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Note updated successfully",
      Data: updatedNote,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error updating note",
      Data: null,
      error: error.message,
    });
  }
};  

//Delete by ID
export const deleteNoteById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote) {
      return res.status(404).json({
        status: "error",
        message: "Note not found",
        Data: null,
        error: "Note not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Note deleted successfully",
      Data: deletedNote,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error deleting note",
      Data: null,
      error: error.message,
    });
  }
};