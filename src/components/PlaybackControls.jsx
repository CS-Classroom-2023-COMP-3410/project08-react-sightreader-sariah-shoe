const PlaybackControls = ({ isTuning, setIsTuning, onStartPlayback, onStopPlayback }) => {
    return (
      <div>
        <button onClick={() => setIsTuning((prev) => !prev)}>
          {isTuning ? "Stop Tuning" : "Tune"}
        </button>
        <button onClick={() => {
          if (typeof onStartPlayback === "function") {
            onStartPlayback();
          } else {
            console.warn("Start function is not ready.");
          }
        }}>
          Start
        </button>
        <button onClick={() => {
          if (typeof onStopPlayback === "function") {
            onStopPlayback();
          } else {
            console.warn("Stop function is not ready.");
          }
        }}>
          Stop
        </button>
      </div>
    );
  };
  
  export default PlaybackControls;
  