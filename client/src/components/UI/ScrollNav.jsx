/* eslint-disable react/prop-types */
import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";

//next button
const Next = () => {
  return (
    <div className="border absolute z-10 top-0 right-0 border-red-500 h-[inherit]">
      <button className="w-[3em] xl:w-[5em] h-[100%] border">next</button>
    </div>
  );
};

//previous button
const Prev = () => {
  return (
    <div className="border absolute z-10 top-0 left-0 border-red-500 h-[inherit]">
      <button className="w-[3em] xl:w-[5em] h-[100%] border">prev</button>
    </div>
  );
};

//scroll items
const ScrollItem = ({ src, bg,id }) => {
  return (
    <div id={id} className="relative overflow-hidden rounded-md h-[100%] bg-[orange] flex-none w-[calc((100%/4)-1%)] lg:w-[calc((100%/6)-1%)]">
      <div className="absolute top-[10px] left-[10px]">
        <img src={src} className="w-[5%]" />
      </div>
      <div className="relative flex justify-center font-bold text-[5em] items-center h-[inherit]">
        {bg}
      </div>
    </div>
  );
};

//scroll indicator
const Span = ({ id, bgSpan }) => {
  return <span className={`${bgSpan[id]||"bg-[rgb(60,60,60)]"} rounded w-[1em] h-[3px] transition-all duration-[0.4s] ease-in-out`}></span>;
};

//data
const genre = [
  {
    _id: 0,
    title: "Tv Shows",
    movies: [
      {
        id: 0,
        logo: "images/LOGO_C.svg",
        bg: "0"
      },
      {
        id: 1,
        logo: "images/LOGO_C.svg",
        bg: "1"
      },
      {
        id: 2,
        logo: "images/LOGO_C.svg",
        bg: "2"
      },
      {
        id: 3,
        logo: "images/LOGO_C.svg",
        bg: "3"
      },
      {
        id: 4,
        logo: "images/LOGO_C.svg",
        bg: "4"
      },
      {
        id: 5,
        logo: "images/LOGO_C.svg",
        bg: "5"
      },
      {
        id: 6,
        logo: "images/LOGO_C.svg",
        bg: "6"
      },
      {
        id: 7,
        logo: "images/LOGO_C.svg",
        bg: "7"
      },
      {
        id: 8,
        logo: "images/LOGO_C.svg",
        bg: "8"
      },
      {
        id: 9,
        logo: "images/LOGO_C.svg",
        bg: "9"
      },
      {
        id: 10,
        logo: "images/LOGO_C.svg",
        bg: "10"
      },
      {
        id: 11,
        logo: "images/LOGO_C.svg",
        bg: "11"
      }
    ]
  }
];

//scroll component
const ScrollNav = () => {
  const [list, setList] = useState([...genre[0].movies]);
  const [children, setChildren] = useState([]);
  const [bgSpan, setBgSpan] = useState(null);
  const scrollRef = useRef();
  const { dvWidth, isPC } = useSelector((state) => state.dvWidth);


  useEffect(() => {
    const scrollChildren = [];

    list.forEach((item, index) =>
      index * 1 < list.length / `${isPC ? 6 : 4}`
        ? `${
            isPC && index === 0
              ? scrollChildren.push(5)
              : isPC
              ? scrollChildren.push(scrollChildren[index - 1] + 6)
              : !isPC && index === 0
              ? scrollChildren.push(3)
              : scrollChildren.push(scrollChildren[index - 1] + 4)
          }`
        : null
    );

    setChildren([...scrollChildren]);
    setBgSpan({ [scrollChildren[0]]: "bg-[rgb(160,160,160)]" });

  }, []);

  console.log(bgSpan);

  const scrollHandler = () => {
    // var nthChild = scrollRef.current.children[7].getBoundingClientRect();
    // console.log(
    //   nthChild.right * 1 > 0 && nthChild.right * 1 < dvWidth * 1
    //     ? "inView"
    //     : "out of view"
    // );

    children.forEach((item) => {
      var nthChild = document.getElementById(item).getBoundingClientRect().right * 1  ;

      nthChild > 0 && nthChild < dvWidth * 1 ? setBgSpan((prev)=> ({...prev, [item]:"bg-[rgb(160,160,160)]"})) : setBgSpan((prev)=> ({...prev, [item]:"bg-[rgb(60,60,60)]"}))
    });

    // console.log(document.getElementById(0))

    //update scroll indicator style
    // children.forEach((item) => {
    //   var nthChild = scrollRef.current.children[item].getBoundingClientRect().right * 1  ;

    //   nthChild > 0 && nthChild < dvWidth * 1 ? setBgSpan((prev)=> ({...prev, [item]:"bg-[rgb(160,160,160)]"})) : setBgSpan((prev)=> ({...prev, [item]:"bg-[rgb(60,60,60)]"}))
    // });

    // var lastChild =
    //   scrollRef.current.lastChild.getBoundingClientRect().right * 1 - 1;
    // var firstChild =
    //   scrollRef.current.firstChild.getBoundingClientRect().left * 1 + 1;

    // console.log(lastChild);
    // console.log(lastChild < dvWidth * 1 ? "reached lastChild" : "", dvWidth);

    // console.log(firstChild);
    // console.log(firstChild > 0 ? "reached firstChild" : "", dvWidth);
  };

  return (
    <>
      <div className="flex flex-row justify-between">
        <p className="mb-2 font-bold px-5 md:px-10 xl:px-[4em] lg:text-xl">
          {genre[0].title}
        </p>
        <div className="flex flex-row gap-2 px-5 items-end py-2">
          {
            //scroll indicator
          children.map((item) => (
            <Span key={item} id={item} bgSpan={bgSpan} />
          ))
          }
          
        </div>
      </div>

      <div className="relative h-[8em] lg:h-[6em] xl:h-[8em]">
        <Next />
        <Prev />

        <div
          ref={scrollRef}
          onScroll={scrollHandler}
          id="scrollNav"
          className="flex relative flex-row gap-[1%] lg:gap-[1%] h-[100%] w-[auto] w-[100%] overflow-scroll"
        >
          {list.map((item) => (
            <ScrollItem key={item.id} id={item.id} src={item.logo} bg={item.bg} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ScrollNav;
