import ReactList from "react-list";
import Note from "./Note";
import { useState } from "react";

function NoteList() {

    const [getNoteList, setNoteList] = useState([
        {
            id: 1,
            title: "Meeting Notes",
            content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam, molestias nisi, vero harum labore laudantium quasi asperiores porro quibusdam mollitia sapiente eaque! Debitis asperiores illum at nobis, tempore et architecto!",
            date:"2025/12/01"
        },
        {
            id: 2,
            title: "Grocery List",
            content: "Milk, eggs, bread, bananas, chicken breast...",
            date:"2025/12/01"
        },
        {
            id: 3,
            title: "Book Ideas",
            content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam, molestias nisi, vero harum labore laudantium quasi asperiores porro quibusdam mollitia sapiente eaque! Debitis asperiores illum at nobis, tempore et architecto!",
            date:"2025/12/01"
        },
        {
            id: 4,
            title: "Weekend Plans",
            content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam, molestias nisi, vero harum labore laudantium quasi asperiores porro quibusdam mollitia sapiente eaque! Debitis asperiores illum at nobis, tempore et architecto!",
            date:"2025/12/01"
        }
    ]);

    return (
        <div className="mt-12 mb-4 px-3 overflow-scroll">
            <ReactList
                itemRenderer={(index) => (
                    <Note {...getNoteList[index]} />
                )}
                length={getNoteList.length}
                type="uniform"
            />
        </div>
    );
}

export default NoteList;
