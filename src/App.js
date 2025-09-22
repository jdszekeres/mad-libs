import './App.css';
import StoryPage from './components/story_page';
import stories from './stories.json';
import StoryCard from './components/story_card';
import { useState } from 'react';
function App() {

  const [selectedStory, setSelectedStory] = useState(null);

  return (
    <div className="App">
      <header>
        <h1>Enraged Libs</h1>
      </header>
      <main>
        {selectedStory ? (<StoryPage story={selectedStory} onBack={() => setSelectedStory(null)} />) :
          (<div className="story-cards" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {stories ? (
              stories.map((story, index) => (

                <StoryCard story={story} onSelect={() => setSelectedStory(story)} />
              ))
            ) : (
              <p>Loading stories...</p>
            )}
          </div>)
        }
      </main >
      <div className="footer" style={{ marginTop: "20px", padding: "10px", borderTop: "1px solid #ccc" }}>
        <p>Created by jdszekeres</p>
        <a href="https://github.com/yourusername/mad-libs">View on GitHub</a>
      </div>
    </div >
  );
}

export default App;
