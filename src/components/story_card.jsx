import Rand, { PRNG } from 'rand-seed';


function StoryCard({ story, onSelect }) {
const rand = new Rand(story.name, PRNG.xoshiro128ss);
//generate a gradient background color based on the story name
const color1 = `hsl(${rand.next() * 360}, 100%, 75%)`;
const color2 = `hsl(${rand.next() * 360}, 100%, 75%)`;
const rotation = rand.next() * 360;
const background = `linear-gradient(${rotation}deg, ${color1}, ${color2})`;

  return (
    <div onClick={onSelect} className="story-card" style={{ width: "15%", border: "1px solid black", boxSizing: "border-box", padding: "10px", borderRadius: "5px", margin: "5px", background, textAlign: "center", justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column" }}>
      <h2>{story.name}</h2>
      
    </div>
  );
}
export default StoryCard;