import { useState } from "react";
import { useNavigate } from "react-router";
import VoiceRecorder from "../components/VoiceRecorder";
import { useNotes } from "../context/NoteContext";

function NewNote() {

  const {getTextnoteFromAudio,loadNotes} = useNotes()

  const [title, setTitle] = useState("");
  const [audioUrl, setAudioUrl] = useState(null);

  const navigate = useNavigate();

  const saveNote = async() => {

    if (title.trim() || audioUrl) {

      const noteTxt = getTextnoteFromAudio(audioUrl)
      console.log("Saving note:", { title, noteTxt });

       const backendUrl = import.meta.env.VITE_BACKEND_URL;
       const response = await fetch(`${backendUrl}/api/notes/create`, {
            method: "POST",
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

      alert("Note saved successfully!");

      setTitle("");
      setAudioUrl(null);

      navigate('/')

    } else {
      alert("Please add a title or record audio before saving.");
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
        &nbsp;&nbsp;&nbsp;New Note
      </h2>

      <div className="flex-1 flex flex-col justify-between">
        <div className="flex-1 flex flex-col mt-10">
          {/* Title Input */}
          <div className="space-y-2">
            <label htmlFor="title" className="block text-lg font-medium text-gray-700">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Voice Recorder */}
          <div className="mt-6 h-full">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 ">Voice Recording</h3>
            <VoiceRecorder onRecordingReady={setAudioUrl} />
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={saveNote}
          className="w-full bg-purple-800 hover:bg-purple-950 text-white py-3 px-4 rounded-lg font-medium transition-colors mt-6"
        >
          Save Note
        </button>
      </div>
    </div>
  );
}

export default NewNote;