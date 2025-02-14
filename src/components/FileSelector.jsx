import { useState } from "react";


const FileSelector = ({ onFileSelect, onTitleSelect }) => {
    const [selectedFile, setSelectedFile] = useState("");
  
    const handleFileChange = async (e) => {
      const file = e.target.value;
      setSelectedFile(file);
  
      if (file) {
        try {
          const response = await fetch(`/music/${file}`);
          if (!response.ok) {
            throw new Error(`Failed to load ${file}`);
          }
          const rawData = await response.text();
          const formattedABC = formatABC(rawData); // Format the ABC file
          const title = extractTitle(rawData); // Get the title from the raw data
          console.log(`Loaded ABC notation from ${file}:`, formattedABC);
          console.log(`Extracted title: ${title}`);
          
          onFileSelect(formattedABC); // Update abcNotation in App.jsx
          onTitleSelect(title); // Update title in App.jsx
        } catch (error) {
          console.error("Error loading ABC file:", error);
        }
      }
    };
  
    // Function to preprocess ABC file (removes unnecessary headers)
    const formatABC = (abcText) => {
      const lines = abcText.split("\n");
      const headers = [];
      const notes = [];
      const ignoredHeaders = new Set(["T", "C", "Z", "S", "N", "G", "O", "H", "I", "P", "W", "F", "B"]);
  
      for (let line of lines) {
        line = line.trim();
        if (!line || line.startsWith("%")) continue;
  
        if (line.length >= 2 && line[1] === ":" && /^[a-zA-Z]$/.test(line[0])) {
          if (ignoredHeaders.has(line[0].toUpperCase())) continue;
          headers.push(line);
        } else {
          notes.push(line);
        }
      }
  
      return headers.join("\n") + "\n" + notes.join("\n");
    };
  
    // Extract the title (T: field) from the raw ABC file
    const extractTitle = (abcText) => {
      const match = abcText.match(/^T:\s*(.+)/m);
      return match ? match[1].trim() : "Untitled";
    };


    return (
        <div>
        <label htmlFor="file">Select ABC File:</label>
        <select id="file" onChange={handleFileChange}>
        <option value="">---Custom ABC---</option>
        
        <option value="cecilio-lesson1-open-strings.abc">cecilio-lesson1-open-strings.abc</option>
        
        <option value="cecilio-lesson2-first-position.abc">cecilio-lesson2-first-position.abc</option>
        
        <option value="cecilio-lesson2-twinkle-twinkle-little-star.abc">cecilio-lesson2-twinkle-twinkle-little-star.abc</option>
        
        <option value="cecilio-lesson3-exercise-1.abc">cecilio-lesson3-exercise-1.abc</option>
        
        <option value="cecilio-lesson3-exercise-2.abc">cecilio-lesson3-exercise-2.abc</option>
        
        <option value="cecilio-lesson3-exercise-3.abc">cecilio-lesson3-exercise-3.abc</option>
        
        <option value="cecilio-lesson3-exercise-4.abc">cecilio-lesson3-exercise-4.abc</option>
        
        <option value="cecilio-lesson3-jingle-bells.abc">cecilio-lesson3-jingle-bells.abc</option>
        
        <option value="cecilio-lesson3-mary-had-a-little-lamb.abc">cecilio-lesson3-mary-had-a-little-lamb.abc</option>
        
        <option value="cecilio-lesson4-camptown-races.abc">cecilio-lesson4-camptown-races.abc</option>
        
        <option value="cecilio-lesson4-lightly-row.abc">cecilio-lesson4-lightly-row.abc</option>
        
        <option value="cecilio-lesson4-russian-dance-tune.abc">cecilio-lesson4-russian-dance-tune.abc</option>
        
        <option value="cecilio-lesson5-eighth-notes.abc">cecilio-lesson5-eighth-notes.abc</option>
        
        <option value="cecilio-lesson5-hungarian-folk-song-1.abc">cecilio-lesson5-hungarian-folk-song-1.abc</option>
        
        <option value="cecilio-lesson5-the-old-gray-goose.abc">cecilio-lesson5-the-old-gray-goose.abc</option>
        
        <option value="cecilio-lesson6-first-position-d-string.abc">cecilio-lesson6-first-position-d-string.abc</option>
        
        <option value="cecilio-lesson6-ode-to-joy.abc">cecilio-lesson6-ode-to-joy.abc</option>
        
        <option value="cecilio-lesson6-scherzando.abc">cecilio-lesson6-scherzando.abc</option>
        
        <option value="cecilio-lesson7-can-can.abc">cecilio-lesson7-can-can.abc</option>
        
        <option value="cecilio-lesson7-country-gardens.abc">cecilio-lesson7-country-gardens.abc</option>
        
        <option value="cecilio-lesson7-gavotte.abc">cecilio-lesson7-gavotte.abc</option>
        
        <option value="cecilio-lesson8-dixie.abc">cecilio-lesson8-dixie.abc</option>
        
        <option value="cecilio-lesson8-largo.abc">cecilio-lesson8-largo.abc</option>
        
        <option value="hot-cross-buns.abc">hot-cross-buns.abc</option>
        
        <option value="lesson1-open-string-exercise-1.abc">lesson1-open-string-exercise-1.abc</option>
        
        <option value="lesson1-open-string-exercise-2.abc">lesson1-open-string-exercise-2.abc</option>
        
        <option value="lesson1-open-string-exercise-3.abc">lesson1-open-string-exercise-3.abc</option>
        
        <option value="lesson1-open-string-exercise-4.abc">lesson1-open-string-exercise-4.abc</option>
        
        <option value="lesson1-open-string-exercise-5.abc">lesson1-open-string-exercise-5.abc</option>
        
        <option value="lesson1-open-string-exercise-6.abc">lesson1-open-string-exercise-6.abc</option>
        
        <option value="lesson2-1st-finger-exercise-1.abc">lesson2-1st-finger-exercise-1.abc</option>
        
        <option value="lesson2-1st-finger-exercise-2.abc">lesson2-1st-finger-exercise-2.abc</option>
        
        <option value="lesson2-1st-finger-exercise-3.abc">lesson2-1st-finger-exercise-3.abc</option>
        
        <option value="lesson2-1st-finger-exercise-4.abc">lesson2-1st-finger-exercise-4.abc</option>
        
        <option value="lesson2-1st-finger-exercise-5.abc">lesson2-1st-finger-exercise-5.abc</option>
        
        <option value="lesson2-1st-finger-exercise-6.abc">lesson2-1st-finger-exercise-6.abc</option>
        
        </select>
        </div>
    );
};

export default FileSelector;
