import { useEffect, useRef, useState } from "react";

const NOTE_COLOR_DEFAULT = "black";
const NOTE_COLOR_PLAYING = "blue";

const MusicSheet = ({ abcNotation, title, setStartPlayback, setStopPlayback }) => {
  const sheetRef = useRef(null);
  const [synth, setSynth] = useState(null);
  const [audioContext, setAudioContext] = useState(null);
  const [visualObj, setVisualObj] = useState(null);
  const [currentEvent, setCurrentEvent] = useState(null);

  useEffect(() => {
    if (!abcNotation) {
      console.warn("No ABC notation provided. Skipping rendering.");
      return;
    }

    if (!window.ABCJS) {
      console.error("ABCJS is not loaded. Ensure it is included in index.html.");
      return;
    }

    console.log("Rendering ABC notation:", abcNotation);
    const renderedVisualObj = window.ABCJS.renderAbc(sheetRef.current, abcNotation, {
      responsive: "resize",
      scale: 1.5,
      add_classes: true,
    })[0];

    setVisualObj(renderedVisualObj);

    // Initialize Synth but DO NOT PLAY YET
    const newSynth = new window.ABCJS.synth.CreateSynth();
    setSynth(newSynth);
    setAudioContext(new (window.AudioContext || window.webkitAudioContext)());
  }, [abcNotation]);

  // Function to change note color
  const colorNote = (event, color) => {
    if (!event || !event.elements) {
      console.warn("No elements found for event:", event);
      return;
    }

    console.log(`Coloring note:`, event, `with color:`, color);

    for (let e of event.elements) {
      for (let s of e) {
        console.log("Applying color to SVG element:", s);
        s.setAttribute("fill", color);
      }
    }
  };

  // Function to handle note event during playback
  const eventCallback = (event) => {
    if (currentEvent) {
      colorNote(currentEvent, NOTE_COLOR_DEFAULT); // Reset old note color
    }

    if (event) {
      colorNote(event, NOTE_COLOR_PLAYING); // Highlight new note
      setCurrentEvent(event);
    } else {
      setCurrentEvent(null);
    }
  };

  // Function to start playback with highlighting
  const startPlayback = async () => {
    if (!synth || !abcNotation || !visualObj) {
      console.error("Synth is not initialized yet.");
      return;
    }

    console.log("Starting playback...");

    await synth.init({
      audioContext,
      visualObj,
    });

    await synth.prime();

    // Play the music and track played notes
    await synth.start(eventCallback);
  };

  // Function to stop playback and clear highlight
  const stopPlayback = () => {
    if (synth) {
      console.log("Stopping playback...");
      synth.stop();
      colorNote(currentEvent, NOTE_COLOR_DEFAULT); // Reset last note color
      setCurrentEvent(null);
    }
  };

  // Ensure `setStartPlayback` and `setStopPlayback` are set when synth is ready
  useEffect(() => {
    if (synth && abcNotation) {
      console.log("Synth is ready. Setting playback functions.");
      setStartPlayback(() => startPlayback);
      setStopPlayback(() => stopPlayback);
    }
  }, [synth, abcNotation]);

  return (
    <div>
      <h2>{title}</h2>
      <div ref={sheetRef} id="notation"></div>
    </div>
  );
};

export default MusicSheet;
