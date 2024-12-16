import React from 'react';
import './SubtitleTimeline.css'
import { FaCirclePlay } from "react-icons/fa6";
import { CgPlayForwards } from "react-icons/cg";
import { CgPlayBackwards } from "react-icons/cg";
import { FaCirclePause } from "react-icons/fa6";
import { useState, useEffect, useRef } from 'react';
import Navbar from '../Navbar/Navbar';



const SubtitleTimeline = ({ data }) => {
    const currentTimerRef = useRef()
    const currentTimeRef = useRef()

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0.88);
    const [isAnimating, setIsAnimating] = useState(false);


    const handlePlayback = () => {
        setIsPlaying(!isPlaying);
        if (isPlaying) {
            clearInterval(currentTimerRef.current);
        } else {
            setIsAnimating(false)
            setCurrentTime(currentTimeRef.current);
            const timer = setInterval(() => {
                setCurrentTime((prevTime) => { currentTimeRef.current = prevTime + 0.1; return prevTime + 0.1 });
            }, 100);
            currentTimerRef.current = timer;
        }
    };

    useEffect(() => {
        setIsPlaying(true)
        const timer = setInterval(() => {
            setCurrentTime((prevTime) => { currentTimeRef.current = prevTime + 0.1; return prevTime + 0.1 });
        }, 100);

        currentTimerRef.current = timer;
       
        return () => clearInterval(timer);
    }, [data]);

    useEffect(() => {
        if (data.length > 0 && currentTime > data[data.length - 1]?.end_time) {
            clearInterval(currentTimerRef.current);
        }
    }, [data, currentTime])

    const activeSubtitles = data.filter(
        (subtitle) => currentTime >= subtitle.start_time && currentTime <= subtitle.end_time
    );

    const lastSubtitle = data[data.length - 1];
    if (lastSubtitle && currentTime > lastSubtitle.end_time) {
        activeSubtitles.push(lastSubtitle); // last subtitle stays visible
    }

    const triggerAnimation = () => {
        setIsAnimating(true);
    };

    return (
        <>

            <div className='subtitle-timeline-wrap'>
                <Navbar />
                <div className='subtitle-timeline'>
                    {activeSubtitles.map((subtitle, index) => (
                        <div key={index} className={`subtitle ${isAnimating ? "animate" : ""}`}>
                            {subtitle.subtitle}
                        </div>
                    ))}
                </div>
                <div className='playback-controls'>
                    <CgPlayBackwards style={{ fontSize: '36px', marginRight: '20px' }} />
                    {!isPlaying ? <FaCirclePlay style={{ fontSize: '36px' }} onClick={() => {
                        handlePlayback();
                    }} /> : <FaCirclePause style={{ fontSize: '36px' }} onClick={() => {
                        handlePlayback(); triggerAnimation()
                    }} />}
                    <CgPlayForwards style={{ fontSize: '36px', marginLeft: '20px' }} />
                </div>
            </div>
        </>
    );

}

export default SubtitleTimeline;
