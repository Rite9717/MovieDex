import React, { useRef, useState, useEffect } from "react";
import Hls from "hls.js";

const HlsPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Fade in component on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // Cleanup HLS instance when component unmounts or src changes
  useEffect(() => {
    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [src]);

  // Reset states when src changes
  useEffect(() => {
    setIsPlaying(false);
    setVideoLoaded(false);
    setError(null);
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }
  }, [src]);

  const handlePlay = () => {
    const video = videoRef.current;
    setIsLoading(true);
    setError(null);

    if (Hls.isSupported()) {
      // Destroy existing HLS instance if any
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }

      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: false,
      });
      
      hlsRef.current = hls;

      // Error handling
      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error("HLS Error:", data);
        
        if (data.fatal) {
          setIsLoading(false);
          
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              setError("Network error: Unable to load video. Please check your connection and try again.");
              // Try to recover
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              setError("Media error: Unable to play video. Attempting to recover...");
              hls.recoverMediaError();
              break;
            default:
              setError("Unable to load video. Please try again later.");
              hls.destroy();
              hlsRef.current = null;
              break;
          }
        }
      });

      hls.loadSource(src);
      hls.attachMedia(video);
      
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsLoading(false);
        setVideoLoaded(true);
        video.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(err => {
            console.log("Play failed:", err);
            setError("Playback failed. Please try again.");
            setIsLoading(false);
          });
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Native HLS support (Safari)
      video.src = src;
      
      video.addEventListener('loadedmetadata', () => {
        setIsLoading(false);
        setVideoLoaded(true);
      });

      video.addEventListener('error', () => {
        setIsLoading(false);
        setError("Unable to load video. Please try again.");
      });

      video.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(err => {
          console.log("Play failed:", err);
          setError("Playback failed. Please try again.");
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      setError("Your browser does not support HLS video playback.");
    }
  };

  const handleRetry = () => {
    setError(null);
    handlePlay();
  };

  return (
    <div className={`text-center mt-5 transition-opacity duration-300 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      {/* Responsive video container with max-width and centered */}
      <div className="w-full max-w-5xl mx-auto">
        {/* Video wrapper to maintain 16:9 aspect ratio */}
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <video
            ref={videoRef}
            controls
            className={`absolute top-0 left-0 w-full h-full rounded-xl shadow-2xl shadow-blue-500/20 bg-black transition-opacity duration-300 ${
              videoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
          
          {/* Loading Spinner Overlay with smooth fade */}
          <div className={`absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-75 rounded-xl transition-opacity duration-300 ${
            isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}>
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="mt-4 text-white text-lg font-semibold animate-pulse">
              Loading video...
            </p>
          </div>

          {/* Error Message Overlay with smooth fade */}
          <div className={`absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-90 rounded-xl transition-opacity duration-300 p-6 ${
            error && !isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}>
            <div className="bg-red-900 bg-opacity-50 border-2 border-red-500 rounded-lg p-6 max-w-md transform transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-center mb-4">
                <svg 
                  className="w-12 h-12 text-red-500 animate-pulse" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
              </div>
              <p className="text-red-200 text-center mb-4 font-semibold">
                {error}
              </p>
              <button
                onClick={handleRetry}
                className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Play Button - Hidden when playing with fade transition */}
      <div className={`transition-opacity duration-300 ${
        !isPlaying && !isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <button
          onClick={handlePlay}
          className="mt-8 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95 cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Play Stream
        </button>
      </div>
    </div>
  );
};

export default HlsPlayer;
