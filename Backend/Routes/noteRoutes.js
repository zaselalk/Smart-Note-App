import express from "express";
import { createNote, deleteNoteById, getAllNotes, getNoteById, updateNoteById } from "../Controllers/noteController.js";

const noteRouter = express.Router();

// Route to create a new note
noteRouter.post("/create", createNote);

//Get all notes
noteRouter.get("/getAll",getAllNotes)

// Route to get a note by ID
noteRouter.get("/:id", getNoteById);

//update note by ID
noteRouter.put("/:id",updateNoteById); 

//Delete note by ID
noteRouter.delete("/:id", deleteNoteById);  

// Export the noteRouter to be used in the main app
export default noteRouter;
