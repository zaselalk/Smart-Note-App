function Note({ id, title, content,date }) {
    
    return (
        <div id={id} className="flex flex-col justify-between align-middle mb-4 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="text-purple-950 font-bold text-2xl">{title}</div> 
            <div className="line-clamp-3 mt-2 text-gray-500 text-sm">
                {content}
            </div> 
            <div className="text-gray-400 text-xs font-bold mt-3 text-right">{date}</div>
        </div>
    );
}

export default Note