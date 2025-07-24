import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import VoiceRecorder from "../components/VoiceRecorder";
import { useEffect } from "react";
import { useNotes } from "../context/NoteContext";

function EditNote() {

    const {noteId} = useParams();
    const {noteList,getTextnoteFromAudio, loadNotes} = useNotes();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [oldNote, setOldNote] = useState("");
  const [audioUrl, setAudioUrl] = useState("");

  useEffect(()=>{

    const note = noteList.find(note => note._id == noteId)
    if (!note) {
      navigate('/');
    }

    setTitle(note.title);
    setOldNote(note.note);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[noteId])

  const updateNote = async() => {

    if (title.trim() || audioUrl) {

       const noteTxt = getTextnoteFromAudio(audioUrl)
       console.log("Updating note:", { title, noteTxt });

       const backendUrl = import.meta.env.VITE_BACKEND_URL;
       const response = await fetch(`${backendUrl}/api/notes/${noteId}`, {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               title: title,
               note: noteTxt,
               date: new Date(),
            }),
       }); 

       if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
       }

       loadNotes();

       alert("Note updated successfully!");
       navigate(-1);
    }
  };

  return (
    <div className="max-w-md mx-auto h-screen rounded-lg shadow-lg p-6 flex flex-col">
      <h2 className="text-2xl font-bold text-purple-950 text-left">
        <span
          onClick={() => navigate(-1)}
          className="px-4 text-2xl bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
        >
          ←
        </span>
        &nbsp;&nbsp;&nbsp;Update Note
      </h2>

      <div className="flex-1 flex flex-col justify-between">
        <div className="flex-1 flex flex-col mt-10 space-y-6">
          {/* Update Title */}
          <div>
            <label htmlFor="title" className="block text-lg font-medium text-gray-700">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Edit title..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Disabled Note Content */}
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Existing Note
            </label>
            <textarea
              value={oldNote}
              disabled
              rows={4}
              className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-100 text-gray-700 resize-none"
            />
          </div>

          {/* Voice Recorder */}
          <div className="mt-4 h-full">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Update Note</h3>
            <VoiceRecorder onRecordingReady={setAudioUrl} />
          </div>
        </div>

        {/* Update Button */}
        <button
          onClick={updateNote}
          className="w-full bg-purple-800 hover:bg-purple-950 text-white py-3 px-4 rounded-lg font-medium transition-colors mt-6"
        >
          Update Note
        </button>
      </div>
    </div>
  );
}

export default EditNote;