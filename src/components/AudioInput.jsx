import { useEffect } from "react";
import * as Pitchfinder from "pitchfinder";

const AudioInput = ({ isTuning, setDetectedNote }) => {
  useEffect(() => {
    if (!isTuning) return; // Only run if tuning mode or playback is on

    let audioContext, analyser, microphone, volumeMeter, detectPitch;

    const startListening = async () => {
      try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        detectPitch = Pitchfinder.YIN({ sampleRate: audioContext.sampleRate });

        console.log("Initializing microphone...");

        // Ensure volume-meter.js is loaded before using it
        await new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = "/js/volume-meter.js";
          script.onload = () => {
            console.log("Volume Meter Loaded");
            resolve();
          };
          document.body.appendChild(script);
        });

        if (!window.createAudioMeter) {
          console.error("createAudioMeter is not available. Check volume-meter.js.");
          return;
        }

        volumeMeter = window.createAudioMeter(audioContext); // Initialize volume meter

        // Get microphone input
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        microphone = audioContext.createMediaStreamSource(stream);
        analyser = audioContext.createAnalyser();
        microphone.connect(analyser);
        microphone.connect(volumeMeter); // Now volumeMeter is defined, so no error

        console.log("Microphone connected, starting detection...");

        const detect = () => {
            console.log(`Sound detected! Volume: ${volumeMeter.volume.toFixed(3)}`);

            const buffer = new Float32Array(analyser.fftSize);
            analyser.getFloatTimeDomainData(buffer);
            const pitch = detectPitch(buffer);

            if (pitch) {
              const note = pitchToNote(pitch);
              console.log(`Detected pitch: ${pitch.toFixed(2)} Hz -> ${note}`);
              setDetectedNote(note);
            }
          if (isTuning) requestAnimationFrame(detect); // Stop when tuning is off
        };
        detect();
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    };

    startListening();

    return () => {
      if (audioContext) {
        audioContext.close();
      }
    };
  }, [isTuning]);

  // Convert pitch frequency to a musical note
  const pitchToNote = (freq) => {
    const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    const A4 = 440;
    const noteNumber = Math.round(12 * (Math.log2(freq / A4)) + 69);
    const octave = Math.floor(noteNumber / 12) - 1;
    const note = notes[noteNumber % 12];
    return `${note}${octave}`;
  };

  return null; // No UI, just audio processing
};

export default AudioInput;
