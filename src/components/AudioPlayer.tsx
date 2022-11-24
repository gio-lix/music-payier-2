import React, {useEffect, useRef, useState} from 'react';
import musics from "../assets/data"
import "../styles/audioPlayer.css"
import {timeDuration} from "../utils";

const AudioPlayer = () => {
    const audioRef = useRef<HTMLAudioElement>(null)
    const [duration, setDuration] = useState<number>(0)
    const [musicIndex, setMusicIndex] = useState<number>(2)
    const [currentTime, setCurrentTime] = useState<number>(0)
    const [isPaying, setIsPlaying] = useState<boolean>(false)
    const [value, setValue] = useState(0)

    const handlePlayAudio = () => {
        if (isPaying) {
            (audioRef.current as HTMLAudioElement).pause()
            setIsPlaying(false)
        } else {
            (audioRef.current as HTMLAudioElement).play()
            setIsPlaying(true)
        }
    }


    const handleStart = () => {
        setDuration(audioRef.current!.duration)
        if (isPaying) {
            audioRef.current?.play()
        }
    }

    const handleMinus = () => {
            audioRef.current!.currentTime -= 30
    }
    const handlePlus = () => {
            audioRef.current!.currentTime += 30
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = Number(e.target.value)
        audioRef.current!.currentTime = time
    }

    const handleTimeUpdate = () => {
        const currentTime = audioRef.current?.currentTime
        setCurrentTime(currentTime!)
    }

    // useEffect(() => {
    //     audioRef.current!.volume = value / 100
    // },[value])

    return (
        <div className="audio">
            <audio
                src={musics[musicIndex].src}
                ref={audioRef}
                onLoadedData={handleStart}
                onTimeUpdate={handleTimeUpdate}
                controls
                hidden
            />
            <div className="current-time-music">
                <p>{timeDuration(currentTime)}</p>
                <div className="progress">
                    <input
                        type="range"
                        min={0}
                        max={duration}
                        value={currentTime}
                        onChange={handleChange}
                        style={{
                            background: `linear-gradient(to right, 
                        #3264fe ${currentTime / duration * 100}%,
                        #e5e5e5 ${currentTime / duration * 100}%
                        )`
                        }}
                    />
                </div>
                <p>{timeDuration(duration)}</p>
            </div>
            {/*Progress Bar*/}
            <div className="payer-bar">
                <i onClick={handleMinus} className="material-icons">
                    replay_30
                </i>
                <i
                    onClick={handlePlayAudio}
                    className="material-icons">
                    {isPaying ? "pause" : "play_arrow"}
                </i>
                <i onClick={handlePlus} className="material-icons">
                    forward_30
                </i>
            </div>
            <div className='image-box '>
                <img
                    className={`${isPaying ? "playingImg" : ""}`}
                    src={musics[musicIndex].thumbnail} alt="image"/>
            </div>

        </div>
    );
};

export default AudioPlayer;
