import { useState } from "react";
import MusicSheet from "./components/MusicSheet";
import AudioInput from "./components/AudioInput";
import PlaybackControls from "./components/PlaybackControls";
import RealTimeFeedback from "./components/RealTimeFeedback";
import FileSelector from "./components/FileSelector";

const App = () => {
  const [abcNotation, setAbcNotation] = useState("");
  const [title, setTitle] = useState("Select a song");
  const [detectedNote, setDetectedNote] = useState("-");
  const [isTuning, setIsTuning] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [startPlayback, setStartPlayback] = useState(() => () => console.warn("Start function not set yet"));
  const [stopPlayback, setStopPlayback] = useState(() => () => console.warn("Stop function not set yet"));

  // Start playback and enable note detection
  const handleStartPlayback = () => {
    setIsPlaying(true);
    startPlayback();
  };

  // Stop playback, disable note detection, and reset UI
  const handleStopPlayback = () => {
    setIsPlaying(false);
    setDetectedNote("-"); // Reset detected note to "-"
    stopPlayback();
  };

  return (
    <div>
      <h1>Interactive Sightreader</h1>
      <FileSelector onFileSelect={setAbcNotation} onTitleSelect={setTitle} />
      <MusicSheet 
        abcNotation={abcNotation} 
        title={title} 
        setStartPlayback={setStartPlayback} 
        setStopPlayback={setStopPlayback} 
      />
      <AudioInput isTuning={isTuning || isPlaying} setDetectedNote={setDetectedNote} />
      <PlaybackControls 
        isTuning={isTuning} 
        setIsTuning={setIsTuning} 
        onStartPlayback={handleStartPlayback} 
        onStopPlayback={handleStopPlayback} 
      />
      <RealTimeFeedback detectedNote={detectedNote} />
    </div>
  );
};

export default App;
