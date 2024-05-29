/* eslint-disable react/prop-types */
// import React from 'react'

import FramerScroll from "./UI/PCNavScroll";
import VideoPlayer from "./VideoPlayer";

const PCHero = ({
  playing,
  setPlaying,
  playerRef,
  isPC,
  resultData,
  hover,
  setHover,
  volume,
  volumeHandler,
  volumeIcon
}) => {
  return (
    <div
      id="hero"
      className="relative h-[50vh] md:h-[40vh]  lg:h-[100vh] overflow-hidden"
    >
      {!playing && (
        <div
          className="absolute top-0 left-0 z-10 w-full h-full overflow-hidden"
          onClick={() => setPlaying(true)}
        >
          <img
            className="scale-[2] md:scale-125 origin-[50%_20%]"
            src="https://image.tmdb.org/t/p/original/tpiqEVTLRz2Mq7eLq5DT8jSrp71.jpg"
            alt="thumbnail"
          />
        </div>
      )}
      <div className="absolute z-10 pointer-events-none top-0 left-0 w-[100%] h-[100%] bg-[linear-gradient(0deg,rgb(0,0,0,0.8)1%,rgb(0,0,0,0),rgb(0,0,0,0))]"></div>

      {isPC && (
        <FramerScroll
          position="absolute z-10 bottom-0 left-0"
          $id={"hero"}
          data={{ ...resultData }}
          hover={hover}
          setHover={setHover}
        />
      )}

      {
        //hero info
        <div className="absolute z-10 left-0 pointer-events-none pl-5 md:pl-10 xl:pl-[4em] border flex flex-row top-[16vh] justify-between items-end lg:top-[50vh] w-full">
          <div className="flex flex-col gap-4 pointer-events-auto">
            <div className="movieTitle flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <img
                  src="images/LOGO_C.svg"
                  className="w-[0.8em] lg:w-[1em] align-center"
                />
                <span className="flex items-center">Series</span>{" "}
              </div>
              <div>
                <span className="font-bold text-[1.5em] lg:text-[2em]">
                  Movie Title
                </span>
              </div>
            </div>

            <div className="flex flex-row justify-between gap-4 items-left">
              <button className="border p-2 px-4 rounded text-black bg-white flex align-center items-center gap-2 font-bold">
                <span>
                  <img src="images/play.svg" className="w-[1em]" />
                </span>
                Play
              </button>
              <button className="border p-2 px-4 rounded bg-[rgb(90,90,90,0.8)]">
                More Info
              </button>
            </div>
          </div>

          <div className="flex flex-row pointer-events-auto">
            <div className="flex mt-2 ml-2 gap-2 ">
              <button className="" onClick={volumeHandler}>
                <img
                  src={`images/volume-${volumeIcon}.svg`}
                  className="w-[2em]"
                />
              </button>
              <span className="bg-[rgb(0,0,0,0.5)] flex items-center border-l-4 p-2 lg:px-4 pr-6 lg:pr-10">
                18+
              </span>
            </div>
          </div>
        </div>
      }

      <VideoPlayer
        volume={volume}
        playing={playing}
        setPlaying={setPlaying}
        playerRef={playerRef}
      />
    </div>
  );
};

export default PCHero;
