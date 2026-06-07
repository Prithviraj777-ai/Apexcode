import { useState, useRef, useEffect } from 'react';
import { Pause, Play, Volume2, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';

const Editorial = ({ secureUrl, thumbnailUrl, duration }) => {
  if (!secureUrl) {
    return (
      <div className="flex flex-col items-center justify-center py-16 border border-dashed border-slate-850 rounded-xl bg-[#090d16]/10 text-center px-4">
        <div className="w-12 h-12 rounded-full bg-[#080c14]/60 flex items-center justify-center text-slate-500 mb-3">
          <Play size={20} className="text-slate-500" />
        </div>
        <p className="text-sm font-semibold text-slate-300">No Video Solution Yet</p>
        <p className="text-xs text-slate-500 max-w-xs mt-1">
          Our team is currently preparing the walkthrough guide. Check back soon!
        </p>
      </div>
    );
  }

  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Format seconds to MM:SS
  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const restartVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  // Update current time during playback
  useEffect(() => {
    const video = videoRef.current;
    
    const handleTimeUpdate = () => {
      if (video) setCurrentTime(video.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };
    
    if (video) {
      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('ended', handleEnded);
      return () => {
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('ended', handleEnded);
      };
    }
  }, []);

  return (
    <div 
      className="relative w-full max-w-2xl mx-auto rounded-xl overflow-hidden shadow-2xl border border-slate-800 bg-black group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={secureUrl}
        poster={thumbnailUrl}
        onClick={togglePlayPause}
        className="w-full aspect-video bg-black cursor-pointer object-contain"
      />
      
      {/* Centered big play button overlay (appears when paused) */}
      {!isPlaying && (
        <div 
          onClick={togglePlayPause}
          className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[1px] transition-all duration-300 cursor-pointer"
        >
          <div className="w-14 h-14 rounded-full bg-indigo-600/90 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-200">
            <Play className="h-6 w-6 fill-white ml-1" />
          </div>
        </div>
      )}

      {/* Video Controls Overlay */}
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 flex flex-col gap-3 transition-opacity duration-300 ${
          isHovering || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Playback Controls Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlayPause}
              className="p-2 rounded-lg hover:bg-slate-850/80 text-white transition-colors cursor-pointer"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
            
            <button
              onClick={restartVideo}
              className="p-2 rounded-lg hover:bg-slate-850/80 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Restart"
            >
              <RotateCcw size={14} />
            </button>

            <div className="flex items-center gap-1.5 text-xs text-slate-300 font-mono ml-2">
              <span>{formatTime(currentTime)}</span>
              <span className="text-slate-500">/</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Volume2 size={16} className="text-slate-400" />
          </div>
        </div>

        {/* Progress Bar Row */}
        <div className="flex items-center w-full gap-3 px-1">
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={(e) => {
              if (videoRef.current) {
                videoRef.current.currentTime = Number(e.target.value);
              }
            }}
            className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400 focus:outline-none transition-all"
          />
        </div>
      </div>
    </div>
  );
};

export default Editorial;