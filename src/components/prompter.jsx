import React, { useState, useEffect, useRef } from 'react';
import { sugguest } from '../words.js';

function Prompter({ type, onChange, value }) {
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [activeSuggestion, setActiveSuggestion] = useState(-1);
    const inputRef = useRef(null);
    const suggestionsRef = useRef(null);


    // Fetch suggestions when value changes
    useEffect(() => {
        const fetchSuggestions = async () => {
            if (value && value.length > 1) {
                try {
                    const results = await sugguest(value, type);
                    setSuggestions(results.slice(0, 8)); // Limit to 8 suggestions
                    setShowSuggestions(true);
                    setActiveSuggestion(-1);
                } catch (error) {
                    console.error('Error fetching suggestions:', error);
                    setSuggestions([]);
                }
            } else {
                setSuggestions([]);
                setShowSuggestions(false);
            }
        };

        const timeoutId = setTimeout(fetchSuggestions, 100); // Debounce API calls
        return () => clearTimeout(timeoutId);
    }, [value, type]);

    const handleInputChange = (e) => {
        onChange(e);
    };

    const handleSuggestionClick = (suggestion) => {
        const syntheticEvent = {
            target: { value: suggestion }
        };
        onChange(syntheticEvent);
        setShowSuggestions(false);
        inputRef.current?.focus();
    };

    const handleKeyDown = (e) => {
        if (!showSuggestions || suggestions.length === 0) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setActiveSuggestion(prev => 
                    prev < suggestions.length - 1 ? prev + 1 : 0
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setActiveSuggestion(prev => 
                    prev > 0 ? prev - 1 : suggestions.length - 1
                );
                break;
            case 'Enter':
                if (activeSuggestion >= 0) {
                    e.preventDefault();
                    handleSuggestionClick(suggestions[activeSuggestion]);
                }
                break;
            case 'Escape':
                setShowSuggestions(false);
                setActiveSuggestion(-1);
                break;
            default:
                break;
        }
    };

    const handleBlur = (e) => {
        // Delay hiding suggestions to allow for clicks
        setTimeout(() => {
            if (!suggestionsRef.current?.contains(document.activeElement)) {
                setShowSuggestions(false);
            }
        }, 150);
    };

    return (
        <div style={{ position: 'relative', margin: '10px 0', width: "30%" }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                {type}
            </label>
            <input 
                ref={inputRef}
                type="text" 
                onChange={handleInputChange} 
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                value={value}
                style={{ 
                    width: '100%', 
                    padding: '8px', 
                    border: '1px solid #ccc', 
                    borderRadius: '4px',
                    fontSize: '14px'
                }}
                placeholder={`Enter a ${type.toLowerCase()}...`}
            />
            {showSuggestions && suggestions.length > 0 && (
                <div 
                    ref={suggestionsRef}
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: '0',
                        right: '0',
                        backgroundColor: 'white',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        zIndex: 1000,
                        maxHeight: '200px',
                        overflowY: 'auto'
                    }}
                >
                    {suggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            style={{
                                padding: '8px 12px',
                                cursor: 'pointer',
                                backgroundColor: index === activeSuggestion ? '#e6f3ff' : 'transparent',
                                borderBottom: index < suggestions.length - 1 ? '1px solid #eee' : 'none'
                            }}
                            onMouseEnter={() => setActiveSuggestion(index)}
                        >
                            {suggestion}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Prompter;