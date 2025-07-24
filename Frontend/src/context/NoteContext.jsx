import { createContext, useContext, useState } from "react";

const NoteContext = createContext();

export const NoteProvider = ({ children }) => {

  const [noteList, setNoteList] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const loadNotes = async () => {

    if (loaded) return; 

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const response = await fetch(`${backendUrl}/api/notes/getAll`);
    const data = await response.json();

    setNoteList(data.Data);
    setLoaded(true);
  };

  return (
    <NoteContext.Provider value={{ noteList, setNoteList, loadNotes, setLoaded}}>
      {children}
    </NoteContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useNotes = () => useContext(NoteContext);
