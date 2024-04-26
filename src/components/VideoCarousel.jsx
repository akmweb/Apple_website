import { useRef } from 'react'
import {hightlightsSlides} from '../constants'
import { useState } from 'react';
import { useEffect } from 'react';
import { pauseImg, playImg, replayImg } from '../utils';

const VideoCarousel = () => {

    const videoRef = useRef([]);
    const videoSpanRef = useRef([]);
    const videoDivRef = useRef([]);

    const [video, setVideo] = useState({
        isEnd: false,
        startPlay: false,
        videoId : 0,
        isLastVideo: false,
        isPLaying: false,
    })

    const [loadedData, setLoadedData] = useState([]);
    const {isEnd, startPlay, videoId, isLastVideo, isPLaying} = video;

    useEffect(()=>{
        if(loadedData.length > 3 ) {
            if(!isPLaying) {
                videoRef.current[videoId].pause();
            }else{
                startPlay && videoRef.current[videoId].play();
            }
        }
    },[startPlay, videoId, isPLaying, loadedData])

    useEffect(()=>{
        const currentProgress = 0;
        let span = videoSpanRef.current;

        if(span[videoId]){
            let anim = gsap.to(span[videoId],{
                onUpdate: () => {

                },onComplete: ()=> {

                }
            })
        }
    },[videoId, startPlay])

    const handleProcess = (type, i) => {
        switch (type) {
          case "video-end":
            setVideo((pre) => ({ ...pre, isEnd: true, videoId: i + 1 }));
            break;
    
          case "video-last":
            setVideo((pre) => ({ ...pre, isLastVideo: true }));
            break;
    
          case "video-reset":
            setVideo((pre) => ({ ...pre, videoId: 0, isLastVideo: false }));
            break;
    
          case "pause":
            setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
            break;
    
          case "play":
            setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
            break;
    
          default:
            return video;
        }
      };

  return (
    <>
        <div className="flex items-center">
            {hightlightsSlides.map((list,i)=>(
                <div id='slider' key={list.id} className='sm:pr-20 pr-10'>
                    <div className='video-carousel_container'>
                        <div className='w-full h-full flex-center rounded-3xl overflow-hidden bg-black'>
                            <video id='video'
                            playsInline={true}
                            preload='auto'
                            muted
                            ref={(el)=> (videoRef.current[i] = el)}
                            onPlay={()=> {
                                setVideo((prevVideo)=> ({
                                    ...prevVideo, isPLaying: true
                                }))
                            }}>
                                <source src={list.video} type='video/mp4'/>
                            </video>
                        </div>

                            <div className='absolute top-12 left-[5%] z-10'>
                                {list.textLists.map((text)=>(
                                    <p key={text} className='md:text-2xl text-xl font-medium'>
                                        {text}
                                    </p>
                                ))}
                            </div>
                    </div>
                </div>
            ))}
        </div>

        <div className='relative flex-center mt-10'>
            <div className='flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full'>
                {videoRef.current.map((_, i)=> (
                    <span key={i}
                    ref={(el) => (videoDivRef.current[i]= el)}
                    className='mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer'>
                         <span className='absolute h-full w-full rounded-full'
                        ref={(el) => (videoSpanRef.current[i]= el)} />
                    </span>
                ))}
            </div>
            <button className='control-btn'>
                <img src={isLastVideo ? replayImg : !isPLaying ? playImg : pauseImg} alt={isLastVideo ? 'replay' :
            !isPLaying? 'play' : 'pause'}
            onClick={isLastVideo
            ? () => handleProcess('video-reset')
            : !isPLaying
            ? ()=> handleProcess('play')
            : () => handleProcess('pause')} />
            </button>
        </div>
    </>
  )
}

export default VideoCarousel