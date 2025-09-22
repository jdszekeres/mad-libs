const sugguest = async (word, part_of_speech) => {
    var pos;
    switch (part_of_speech) {
        case "noun":
            pos = "n";
            break;
        case "verb":
            pos = "v";
            break;
        case "adjective":
            pos = "adj";
            break;
        case "adverb":
            pos = "adv";
            break;
        default:
            pos = "u";
            break;

    }

    console.log(`Fetching suggestions for ${word} as a ${part_of_speech} (${pos})`);
    const query = `https://api.datamuse.com/words?sp=${word}*&md=p`;
    const response = await fetch(query);
    const data = await response.json();

    if (part_of_speech) {
        return data.filter(entry => entry.tags && entry.tags.includes(pos)).sort((a, b) => b.score - a.score).map(entry => entry.word);
    }

    return []; //it's be weird to suggest words w/o knowing what it should be
    // return data.sort((a, b) => b.score - a.score).map(entry => entry.word);
}

export { sugguest };