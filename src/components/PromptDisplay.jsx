// client/src/components/PromptDisplay.jsx

import React from "react";

const PromptDisplay = ({ original, enhanced, explanation }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(enhanced);
    alert("Enhanced prompt copied to clipboard!");
  };

  return (
    <div className="results-container">
      <h2>Results</h2>
      <div className="prompt-comparison">
        <div className="prompt-box original-prompt">
          <h3>Original Prompt</h3>
          <p>{original}</p>
        </div>

        <div className="prompt-box enhanced-prompt">
          <h3>✨ Enhanced Prompt</h3>
          <pre>
            <code>{enhanced}</code>
          </pre>
          <button onClick={handleCopy} className="copy-btn">
            Copy
          </button>
        </div>
      </div>

      <div className="explanation-box">
        <h3>Why is this better?</h3>
        <p>{explanation}</p>
      </div>
    </div>
  );
};

export default PromptDisplay;
