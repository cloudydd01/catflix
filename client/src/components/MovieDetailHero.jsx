/* eslint-disable react/prop-types */
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import HeroInfo from "./HeroInfo";
import VideoModal from "./VideoModal";
import NetflixPlayer from "./NetflixPlayer";

const MovieDetailHero = ({
  playing,
  setPlaying,
  playerRef,
  volume,
  volumeHandler,
  volumeIcon,
  id,
  movieType,
  movie,
  src,
  bg,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [title, setTitle] = useState();
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [videoSources, setVideoSources] = useState([]);
  const [subtitles, setSubtitles] = useState([]);

  const handlePlayClick = (movie) => {
    setVideoSources(movie.videoSources);
    setSubtitles(movie.subtitles);
    setShowVideoModal(true);
  };

  return (
    <div className="relative h-[30vh] lg:h-[50vh] w-full md:h-[40vh] lg:h-[50vh] overflow-hidden ">
      {!loaded && (
        <div className="absolute top-0 left-0 h-full w-full z-[40]">
          <Loader />
        </div>
      )}

      <AnimatePresence initial={false}>
        {!playing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "linear" }}
            className="absolute top-0 left-0 z-10 w-full h-full overflow-hidden"
            onClick={() => handlePlayClick(movie)} // 修改点击事件
          >
            <picture>
              <source
                media="(min-width: 650px)"
                srcSet={`https://image.tmdb.org/t/p/original${bg || src}`}
              />
              <source
                media="(min-width: 350px)"
                srcSet={`https://image.tmdb.org/t/p/w500${bg || src}`}
              />
              <img
                className="scale-[1.4] md:scale-125 origin-[50%_20%]"
                src={`https://image.tmdb.org/t/p/w500${bg || src}`}
                alt="thumbnail"
                onLoad={() => setLoaded(true)}
              />
            </picture>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute z-10 pointer-events-none bottom-[-0.5em] left-0 w-[100%] h-[100%] bg-[linear-gradient(0deg,rgb(0,0,0,0.8)1%,rgb(0,0,0,0),rgb(0,0,0,0))]"></div>

      {
        //hero info
        <HeroInfo
          volumeIcon={volumeIcon}
          volumeHandler={volumeHandler}
          title={title}
          movie={movie}
          movieType={movieType}
        />
      }

      <VideoModal isOpen={showVideoModal} onClose={() => setShowVideoModal(false)}>
        <NetflixPlayer videoSources={videoSources} subtitles={subtitles} />
      </VideoModal>
    </div>
  );
};

export default MovieDetailHero;