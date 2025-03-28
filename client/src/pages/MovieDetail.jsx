/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MovieDetailHero from "../components/MovieDetailHero";
import MovieDetailInfo from "../components/MovieDetailInfo";
import VideoModal from "../components/VideoModal"; // 导入 VideoModal
import NetflixPlayer from "../components/NetflixPlayer"; // 导入 NetflixPlayer
import { setIntro } from "../utils/featureSlice";
import {
  addWatchList,
  removeWatchList,
} from "../utils/reusableFunctions/watchList";

const MovieDetail = ({
  movieType,
  movieID,
  bg,
  genres,
  setAccountClick,
  setNavView,
}) => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [volumeIcon, setVolumeIcon] = useState("max");
  const [watchIcon, setWatchIcon] = useState("add-icon");
  const [videoSources, setVideoSources] = useState([]);
  const [subtitles, setSubtitles] = useState([]);

  const playerRef = useRef();

  const { id } = useParams();
  const location = useLocation();

  const state = location.state;

  let $movieType = state ? state.groupType || state.movieType : movieType;
  let $genres = state ? state.genres : genres;
  let $id = id ? id : movieID;

  let $data = state ? state.$data : null;

  const { isPC } = useSelector((state) => state.deviceInfo);
  const navigate = useNavigate();
  const { data, profile } = useSelector((state) => state.account);
  const dispatch = useDispatch();

  const volumeHandler = () => {
    if (volume === 1) {
      setVolumeIcon("off");
      setVolume(0);
    } else {
      setVolumeIcon("max");
      setVolume(1);
    }
  };

  const playHandler = () => {
    setVideoSources($data.videoSources || [
      {
        src: "https://cfp2.jw-cdn.org/a/3c94278/3/o/jwb-115_CHS_02_r480P.mp4", // 替换为演示视频路径
        type: "video/mp4",
      },
    ]);
    setSubtitles($data.subtitles || [
      {
        src: "https://cfp2.jw-cdn.org/a/21e2174/2/o/jwb-115_CHS_02.vtt", // 替换为演示字幕路径
        label: "中文",
        srclang: "zh",
      },
    ]);
    setPlaying(true);
    dispatch(setIntro(true));
    setNavView(false);
    setAccountClick(false);
  };

  //handle watchList logic
  const watchListHandler = () => {
    if (watchIcon === "add-icon") {
      addWatchList(
        movieType,
        dispatch,
        setWatchIcon,
        profile,
        $data,
        data["_id"]
      );
    } else {
      removeWatchList(dispatch, setWatchIcon, profile, $data, data["_id"]);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!$data) {
      console.log("navigating");
      navigate("error_404");
    }
    setNavView(true);
    //reset default values on show change
    for (var any of profile.watchList) {
      if (any.name && any.name === $data.name) {
        setWatchIcon("remove-icon");
        break;
      } else if (any.title && any.title === $data.title) {
        setWatchIcon("remove-icon");
        break;
      } else {
        setWatchIcon("add-icon");
      }
    }
  }, []);

  return (
    <>
      {$data && (
        <div className="w-[100%] flex flex-col justify-center gap-[1em]">
          <>
            <MovieDetailHero
              playerRef={playerRef}
              playing={playing}
              setPlaying={setPlaying}
              volume={volume}
              volumeHandler={volumeHandler}
              volumeIcon={volumeIcon}
              movie={$data}
              id={$id}
              movieType={$movieType}
              src={$data["backdrop_path"]}
              bg={bg}
            />

            {!isPC && (
              <div className="flex justify-center items-center w-[100%] px-[4%] gap-[5%]">
                <button
                  onClick={playHandler}
                  className="rounded-[4px] p-2 bg-white text-[1em] md:text-[1.5em] text-black font-[500] w-[50%] flex justify-center items-center gap-1 "
                >
                  <span>
                    <img
                      src="/images/play.svg"
                      alt="play"
                      className="w-[1em]"
                    />
                  </span>
                  <span>Play</span>
                </button>

                <button
                  onClick={watchListHandler}
                  className="rounded-[4px] p-2 bg-[rgb(55,55,55,0.9)] text-[1em] md:text-[1.5em] text-white font-[500] w-[50%] flex justify-center items-center gap-1 "
                >
                  <span>
                    <img
                      src={`/images/${watchIcon}.svg`}
                      alt="add"
                      className="w-[1.5em]"
                    />
                  </span>
                  <span>My List</span>
                </button>
              </div>
            )}

            <MovieDetailInfo
              $movieType={$movieType}
              $id={id}
              $genres={$genres}
            />
          </>
        </div>
      )}
      {playing && (
        <VideoModal isOpen={playing} onClose={() => setPlaying(false)}>
          <NetflixPlayer videoSources={videoSources} subtitles={subtitles} />
        </VideoModal>
      )}
    </>
  );
};

export default MovieDetail;