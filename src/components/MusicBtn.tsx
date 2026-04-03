import React, { useState } from 'react';

const MusicBtn: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    const toggleMusic = () => {
        setIsPlaying(!isPlaying);
        // Add actual audio logic here if needed
    };

    return (
        <button 
            id="music-btn" 
            className={isPlaying ? 'playing' : ''} 
            onClick={toggleMusic}
            aria-label="Toggle music"
        >
            <div className="bars">
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
        </button>
    );
};

export default MusicBtn;
