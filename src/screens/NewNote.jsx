import { useState } from 'react';
import { Mic, Square, Play, Pause } from 'lucide-react';

function NewNote() {
    const [title, setTitle] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audio, setAudio] = useState(null);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);
            const chunks = [];

            recorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunks.push(e.data);
                }
            };

            recorder.onstop = () => {
                const blob = new Blob(chunks, { type: 'audio/wav' });
                setAudioBlob(blob);
                stream.getTracks().forEach(track => track.stop());
            };

            recorder.start();
            setMediaRecorder(recorder);
            setIsRecording(true);
        } catch (err) {
            console.error('Error accessing microphone:', err);
        }
    };

    const stopRecording = () => {
        if (mediaRecorder && isRecording) {
            mediaRecorder.stop();
            setIsRecording(false);
            setMediaRecorder(null);
        }
    };

    const playAudio = () => {
        if (audioBlob) {
            const audioUrl = URL.createObjectURL(audioBlob);
            const audioElement = new Audio(audioUrl);
            
            audioElement.onended = () => {
                setIsPlaying(false);
                setAudio(null);
            };
            
            audioElement.play();
            setAudio(audioElement);
            setIsPlaying(true);
        }
    };

    const pauseAudio = () => {
        if (audio) {
            audio.pause();
            setIsPlaying(false);
        }
    };

    const saveNote = () => {
        if (title.trim() || audioBlob) {
            // Here you would typically save to your backend or storage
            console.log('Saving note:', { title, audioBlob });
            alert('Note saved successfully!');
            
            // Reset form
            setTitle('');
            setAudioBlob(null);
            setIsPlaying(false);
            setAudio(null);
        } else {
            alert('Please add a title or record audio before saving.');
        }
    };

    return (
        <div className="max-w-md mx-auto h-screen rounded-lg shadow-lg p-6 flex flex-col">
            <h2 className="text-2xl font-bold text-purple-950 text-left">New Note</h2>
            
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

                    {/* Voice Recording Section */}
                    <div className="flex-1 flex flex-col mt-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-6">Voice Recording</h3>
                        
                        <div className="flex-1 flex flex-col items-center justify-center space-y-6">
                            <div className="flex items-center justify-center">
                                {!isRecording ? (
                                    <button
                                        onClick={startRecording}
                                        className="w-20 h-20 bg-purple-500 hover:bg-purple-600 text-white rounded-full flex items-center justify-center transition-colors shadow-lg"
                                    >
                                        <Mic size={32} />
                                    </button>
                                ) : (
                                    <button
                                        onClick={stopRecording}
                                        className="w-20 h-20 bg-gray-600 hover:bg-gray-700 text-white rounded-full flex items-center justify-center transition-colors animate-pulse shadow-lg"
                                    >
                                        <Square size={32} />
                                    </button>
                                )}
                            </div>

                            {/* Status indicator */}
                            {isRecording && (
                                <div className="text-center">
                                    <div className="inline-flex items-center space-x-2 text-purple-600">
                                        <div className="w-2 h-2 bg-purple-950 rounded-full animate-pulse"></div>
                                        <span className="text-sm">Recording...</span>
                                    </div>
                                </div>
                            )}

                            {/* Audio Playback */}
                            {audioBlob && (
                                <div className="bg-gray-50 p-4 rounded-lg w-full max-w-xs">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Recording ready</span>
                                        <div className="flex space-x-2">
                                            {!isPlaying ? (
                                                <button
                                                    onClick={playAudio}
                                                    className="flex items-center space-x-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors"
                                                >
                                                    <Play size={16} />
                                                    <span>Play</span>
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={pauseAudio}
                                                    className="flex items-center space-x-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm transition-colors"
                                                >
                                                    <Pause size={16} />
                                                    <span>Pause</span>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Save Button - Fixed at bottom */}
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