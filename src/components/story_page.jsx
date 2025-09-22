import React, { useState } from 'react';
import Prompter from './prompter';

function StoryPage({ story, onBack }) {
    const [blanks, setBlanks] = useState(Array(story.blanks.length).fill(""));

    const [showStory, setShowStory] = useState(false);
    return (
        <div className="story-page">
            <button onClick={onBack}>Back</button>
            <div style={{ display: showStory ? "none":"flex", flexWrap: "wrap", justifyContent: "space-around",  }}>
            {story.blanks.map((blank, index) => (
                    <Prompter type={blank} value={blanks[index]} onChange={(e) => {
                        const newBlanks = [...blanks];
                        newBlanks[index] = e.target.value;
                        setBlanks(newBlanks);
                    }} key={index} />
            ))}
            </div>

            <div style={{display: showStory ? "none" : "block", margin: "20px"}}>
                <button disabled={blanks.some(blank => blank === "")} onClick={() => setShowStory(true)}>Enrage the Libs</button>
            </div>

            <div style={{ display: showStory ? "block" : "none" }}>
                <h2>{story.name}</h2>
                {/* <p>{story.text.replace(/{(\d+)}/g, (match, index) => blanks[index] || "")}</p>  */} {/* old way, but need to hilight user selected word */}
                <p>{story.text.split(/{(\d+)}/g).map((part, index) => {
                    const partIndex = parseInt(part, 10);
                    return (
                        <span key={index} style={{ backgroundColor: partIndex >= 0 ? "rgba(128, 128, 128, 0.5)" : "transparent" }}>
                            {partIndex >= 0 ? blanks[partIndex] : part}
                        </span>
                    );
                })}</p>
            </div>
        </div>
    );
}

export default StoryPage;