"use client";
import Image from "next/image";
import { notFound } from "next/navigation";
import { projects, plants } from "@/data";
import { useState, useEffect, lazy, Suspense } from "react";
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

  // State
  const [smallOrWide, setSmallOrWide] = useState<string | null>(null);
  const [data] = useState<projectType>(
    projects[project as keyof typeof projects],
  );
  const [gallery, setGallery] = useState<string[][] | null>(null);
  const [randomNumbersPlants, setRandomNumbersPlants] = useState<
    number[] | null
  >(null);

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
      <div className="relative flex flex-col items-center h-auto w-full overflow-hidden">
        <div className="w-full h-full flex flex-col items-center">
          {/*MENU BUTTON*/}
          <div
            onClick={() =>
              (window.location.href =
                "https://alexei-torres-portfolio.netlify.app")
            }
            className="cursor-pointer fixed text-white font-medium bg-[#363F1F] top-5 w-auto h-auto z-[50] right-5 sm:right-10 px-5 py-2 rounded-md"
          >
            Volver al portafolio
          </div>
          {/*MENU BUTTON*/}
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
                {/*YOUTUBE BUTTON*/}
                <div
                  onClick={() => (window.location.href = `${data.videoLink}`)}
                  className="cursor-pointer bg-[#FF0000] text-white rounded-full px-2 py-1 border-[2px] border-solid border-[#c11a00]"
                >
                  ver en{" "}
                  <span className="font-bold font-['arial']">YouTube</span>
                </div>
                {/*GIHUB BUTTON*/}
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
          <div className="flex flex-col w-full bg-gray-100 py-10">
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
                          left: `${leftOrRight === "left" ? "0px" : "undefined"}`,
                          right: `${leftOrRight === "right" ? "0px" : "undefined"}`,
                          transform: `${invertImage === true ? "scaleX(-1)" : "undefined"}`,
                          backgroundSize: "contain",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: `${leftOrRight === "left" ? "left" : "right"}`,
                        }}
                        className="sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[700px] lg:h-[700px] w-[300px] h-[300px]"
                      >
                        <Image
                          className="absoluet"
                          alt="project image from gallery"
                          src={`/images/plants/${image[0]}`}
                          fill={true}
                          priority={true}
                          style={{
                            objectFit: "contain",
                          }}
                        />
                      </div>
                      {/*IMAGE*/}
                      <div
                        className={`relative my-2 smrProjectScreenShotsMovil sm:smProjectScreenShotsMovil md:mdProjectScreenShotsMovil lg:lgProjectScreenShotsDesktop xl:xlProjectScreenShotsDesktop border border-solid border-[#363F1F] z-10 bg-cover bg-center bg-no-repeat`}
                      >
                        <Image
                          className="absolute"
                          alt="project logo"
                          src={
                            smallOrWide === "wide"
                              ? `/images/${project}/desktop/${i + 1}.png`
                              : `/images/${project}/movil/${i + 1}.png`
                          }
                          fill={true}
                          style={{
                            objectFit: "cover",
                          }}
                          priority={true}
                        />
                      </div>
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
