import Note from "./Note";
import { useState,useEffect } from "react";

function NoteList() {

    const [getNoteList, setNoteList] = useState([]);

    useEffect(()=>{
        loadNotes();
    },[])

    const loadNotes = async()=>{
        
        const backendUrl = import.meta.env.VITE_BACKEND_URL;

        if (!backendUrl) {
            throw new Error('REACT_APP_BACKEND_URL is not defined in .env file');
        }

        // Send GET request to fetch notes
        const response = await fetch(`${backendUrl}/api/notes/getAll`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data)
        setNoteList(data.Data);
    }


    return (
        <div className="mt-12 mb-4 px-3 overflow-y-scroll">
            <div className="flex flex-wrap gap-4 sm:justify-center lg:justify-start">
                {getNoteList.map((note) => (
                    <div key={note._id} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
                        <Note {...note} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NoteList;
