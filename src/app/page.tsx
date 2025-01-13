"use client";
import { notFound } from "next/navigation";
import { projects, plants } from "@/data";
import { useState, useEffect, lazy, useRef, Suspense } from "react";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import CloseIcon from "@mui/icons-material/Close";
import YouTubeIcon from "@mui/icons-material/YouTube";
import GitHubIcon from "@mui/icons-material/GitHub";
const Section4 = lazy(() => import("@/components/section4/section4"));

type projectType = {
  name: string;
  description: string;
  stack: string;
  videoLink: string;
  githubRep: string;
  styles: {
    title: string;
    titleCss: {
      color: string;
    };
    bgColor: string;
    title2?: string;
    title2Css?: {
      color: string;
    };
  };
  desktopPreview: string[][];
  movilPreview: string[][];
};

export default function ProjectPage() {
  // Params
  const project: string = "wasppet";

  // Ref
  const menu = useRef<HTMLDivElement | null>(null);

  // State
  const [smallOrWide, setSmallOrWide] = useState<string | null>(null);
  const [data] = useState<projectType>(
    projects[project as keyof typeof projects],
  );
  const [gallery, setGallery] = useState<string[][] | null>(null);
  const [randomNumbersPlants, setRandomNumbersPlants] = useState<
    number[] | null
  >(null);
  // Icons state
  const [icon1] = useState(
    <DragHandleIcon className="noquitmenu" sx={{ fontSize: "30px" }} />,
  );
  const [icon2] = useState(
    <CloseIcon className="noquitmenu" sx={{ fontSize: "28px" }} />,
  );
  const [currentIcon, setCurrentIcon] = useState(icon1);

  // Functions
  const showMenu = () => {
    if (menu.current?.className.includes("no-show")) {
      menu.current.className = menu.current.className.replace(
        "no-show sm:left-[-50%] md:left-[-30%] lg:left-[-20%] left-[-80%]",
        "show left-0",
      );
      setCurrentIcon(icon2);
      return;
    }
    if (menu.current?.className.includes("show")) {
      menu.current.className = menu.current.className.replace(
        "show left-0",
        "no-show sm:left-[-50%] md:left-[-30%] lg:left-[-20%] left-[-80%]",
      );
      setCurrentIcon(icon1);
      return;
    }
  };

  // Effect
  useEffect(() => {
    // 404 logic
    if (!Object.keys(projects).find((i) => i === project)) {
      notFound();
    }
    // Get the window width
    if (window.innerWidth < 800) {
      setGallery(data.movilPreview);
      setSmallOrWide("small");
    } else {
      setGallery(data.desktopPreview);
      setSmallOrWide("wide");
    }
  }, [project, data]);

  useEffect(() => {
    if (!gallery) return;
    const randomNumbers = [];
    for (let i = 0; i < gallery.length; i++) {
      randomNumbers.push(Math.floor(Math.random() * plants.length));
    }
    setRandomNumbersPlants(randomNumbers);
  }, [gallery]);

  // JSX
  if (
    data &&
    smallOrWide &&
    gallery &&
    randomNumbersPlants?.length === gallery.length
  )
    return (
      <div
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          // Verify user is no clicking an element that must not close the menu
          const target = e.target;
          if (
            target instanceof HTMLElement &&
            !target.classList.contains("noquitmenu")
          ) {
            //------------------------ Close the menu when clicking in any other place/element
            if (menu.current?.className.includes("show")) {
              menu.current.className = menu.current.className.replace(
                "show left-0",
                "no-show sm:left-[-50%] md:left-[-30%] lg:left-[-20%] left-[-80%]",
              );
              setCurrentIcon(icon1);
            }
          }
        }}
        className="relative flex flex-col items-center h-auto w-[100vw] overflow-hidden"
      >
        <div className="w-full h-full max-w-[1450px] flex flex-col items-center">
          {/*MENU BUTTON*/}
          <div
            onClick={() => showMenu()}
            className="cursor-pointer fixed top-5 w-auto h-auto z-[50] right-5 sm:right-10 bg-white rounded-md"
          >
            {currentIcon}
          </div>
          {/*MENU BUTTON*/}
          {/*MENU MODAL*/}
          <div
            ref={menu}
            className="noquitmenu no-show sm:left-[-50%] md:left-[-30%] lg:left-[-20%] left-[-80%] sm:w-[50%] md:w-[30%] lg:w-[20%] w-[80%] h-[100%] fixed top-0  z-[50] bg-[rgba(54,63,31,0.7)] transition-all duration-100"
          >
            <div className="flex flex-col text-white bg-[#363F1F] text-lg font-normal">
              <div
                onClick={() =>
                  (window.location.href =
                    "https://alexei-torres-portfolio.netlify.app")
                }
                className="cursor-pointer border-b border-solid border-black"
                style={{
                  /*backgroundColor: `${data.styles.titleCss.color}`*/
                  backgroundColor: "#8b9339",
                }}
              >
                <p className="w-full h-full py-4 pl-2 transition-all duration-100 hover:bg-[rgba(0,0,0,0.5)]">
                  Home
                </p>
              </div>
              {projects &&
                Object.keys(projects).map((key, i) => (
                  <div key={i}>
                    {key !== project && (
                      <div
                        onClick={() => {
                          if (key === "servo") {
                            window.location.href =
                              "https://alexei-torres-servo.netlify.app";
                          }
                          if (key === "wasppet") {
                            window.location.href =
                              "https://alexei-torres-wasppet.netlify.app";
                          }
                        }}
                        style={{
                          /*backgroundColor: `${data.styles.titleCss.color}`,*/
                          backgroundColor: "#8b9339",
                        }}
                        className="cursor-pointer border-b border-solid border-black"
                      >
                        <p className="w-full h-full py-4 pl-2 transition-all duration-100 hover:bg-[rgba(0,0,0,0.5)]">
                          {projects[key as keyof typeof projects].name}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
          {/*MENU MODAL*/}
          <h1
            /*style={{ textShadow: "1px 4px 8px #999999" }}*/
            className="z-10 text-[50px] sm:text-[70px] md:text-[100px]"
          >
            <span style={data.styles.titleCss}>{data.styles.title}</span>
            <span style={data.styles.title2Css}>
              {data.styles.title2 && data.styles.title2}
            </span>
          </h1>
          <div className="z-10 text-center md:text-start py-20 flex flex-col gap-6 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%]">
            <p className="text-xl font-light">{data.description}</p>
            <p
              /*style={{ color: `${data.styles.titleCss.color}` }}*/
              className="text-lg font-light"
            >
              <span className="text-black font-light">
                Para este proyecto se utilizó:{" "}
              </span>
              {data.stack}
            </p>
            <div className="flex flex-col justify-center items-center gap-4">
              <div className="flex gap-8 items-center">
                <YouTubeIcon
                  onClick={() => (window.location.href = `${data.videoLink}`)}
                  className="cursor-pointer text-[#FF0000]"
                  sx={{ fontSize: "40px" }}
                />
                <GitHubIcon
                  onClick={() => (window.location.href = `${data.githubRep}`)}
                  className="cursor-pointer"
                  sx={{ fontSize: "35px" }}
                />
              </div>
              <p className="font-light">
                Mira el proyecto completo en YouTube o GitHub.<br></br>La
                versión del programa puede variar en YouTube.
              </p>
            </div>
          </div>
          <div className="flex flex-col w-full bg-[#8b9339] py-10">
            {gallery &&
              gallery.map((item: string[], i: number) => {
                const image = plants[randomNumbersPlants[i]];
                const leftOrRight = i % 2 === 0 ? "left" : "right";
                const invertImage = image[1] === leftOrRight ? false : true;
                return (
                  <Suspense key={i}>
                    <div className="relative flex flex-col items-center justify-center">
                      {/*IMAGE*/}
                      <div
                        style={{
                          position: "absolute",
                          backgroundImage: `url(/images/plants/${image[0]})`,
                          left: `${leftOrRight === "left" ? "0px" : "undefined"}`,
                          right: `${leftOrRight === "right" ? "0px" : "undefined"}`,
                          transform: `${invertImage === true ? "scaleX(-1)" : "undefined"}`,
                          backgroundSize: "contain",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: `${leftOrRight === "left" ? "left" : "right"}`,
                        }}
                        className="sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[700px] lg:h-[700px] w-[300px] h-[300px]"
                      ></div>
                      {/*IMAGE*/}
                      <div
                        style={{
                          backgroundImage:
                            smallOrWide === "wide"
                              ? `url(/images/${project}/desktop/${i + 1}.png)`
                              : `url(/images/${project}/movil/${i + 1}.png)`,
                        }}
                        className={`my-2 smrProjectScreenShotsMovil sm:smProjectScreenShotsMovil md:mdProjectScreenShotsMovil lg:lgProjectScreenShotsDesktop xl:xlProjectScreenShotsDesktop border border-solid border-[#363F1F] z-10 bg-cover bg-center bg-no-repeat`}
                      ></div>
                      {item[1].length > 0 && (
                        <div className="shadow-2xl shadow-black rounded-md smrProjectScreenShotsMovilText sm:smProjectScreenShotsMovilText md:mdProjectScreenShotsMovilText lg:lgProjectScreenShotsDesktopText xl:xlProjectScreenShotsDesktopText p-2 my-6 sm:my-8 md:my-10 z-40 flex items-center justify-center bg-[#363F1F]">
                          <p className="font-light rounded-md text-white text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                            {item[1]}
                          </p>
                        </div>
                      )}
                    </div>
                  </Suspense>
                );
              })}
          </div>
          <Section4 />
        </div>
      </div>
    );
}
