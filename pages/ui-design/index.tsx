import Head from "next/head";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Card from "./card";
import { AnimatePresence, motion } from "framer-motion";
import router from "next/router";

interface ImageProps {
  id: number;
  name: string;
  img: string;
}

interface PortfolioProps {
  data: ImageProps[];
}

export default function Portfolio(props: PortfolioProps) {
  const [enlarge, setEnlarge] = useState(false);
  const [image, setImage] = useState("");

  return (
    <>
      <Head>
        <title>Michal Rodek</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex flex-col gap-8">
        <h1 className="text-3xl text-primary-800 dark:text-primary-300 font-poppins font-bold text-center">
          UI design
        </h1>
        <div
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(20rem, 1fr))",
          }}
          className="grid gap-12"
        >
          {props.data.map((card) => {
            return (
              <Card
                key={card.id}
                img={card.img}
                name={card.name}
                setEnlarge={setEnlarge}
                setImage={setImage}
                id={card.id}
              />
            );
          })}
        </div>
      </div>
      <Preview
        image={image}
        enlarge={enlarge}
        data={props.data}
        setEnlarge={setEnlarge}
        setImage={setImage}
      />
    </>
  );
}

export async function getServerSideProps() {
  const resp = await fetch("http://localhost:4000/me/api/images");
  const data = await resp.json();

  return { props: { data: data.reverse() } };
}

interface PreviewProps {
  image: string;
  enlarge: boolean;
  data: ImageProps[];
  setEnlarge: Dispatch<SetStateAction<boolean>>;
  setImage: Dispatch<SetStateAction<string>>;
}

const Preview = (props: PreviewProps) => {
  const handleClose = () => {
    props.setEnlarge(false);
    router.back();
  };

  useEffect(() => {
    router.beforePopState((historyState) => {
      if (!historyState.as.includes("ui-design")) return true;

      if (historyState.as !== "/me/ui-design/") {
        const imageId = historyState.as.match(/ui-design\/.*?([0-9]+)/)[1];
        const bar = props.data.find((foo) => foo.id.toString() === imageId);
        props.setImage(bar.img);
        props.setEnlarge(true);
      }

      if (historyState.as === "/me/ui-design/") {
        props.setEnlarge(false);
      }

      if (historyState.url !== "/me/ui-design/") {
        return false;
      }

      return true;
    });
  }, []);

  return (
    <AnimatePresence>
      {props.enlarge && (
        <motion.div
          style={{
            position: "fixed",
            height: "100%",
            width: "100%",
            top: 0,
            left: 0,
            display: "flex",
          }}
          animate={{ background: "rgba(0, 0, 0, 0.8)" }}
          onClick={handleClose}
          exit={{ background: "rgba(0, 0, 0, 0)" }}
        >
          <motion.div
            style={{
              position: "relative",
              height: "90%",
              width: "90%",
              margin: "auto",
              display: "flex",
              scale: 0,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{
              scale: 0.3,
              opacity: 0,
            }}
          >
            <img
              onClick={(e) => e.stopPropagation()}
              src={`/me/ui/${props.image}.png`}
              className="m-auto max-h-full"
            ></img>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
