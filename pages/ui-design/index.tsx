import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import Card from "./card";
import { AnimatePresence, motion, useAnimation } from "framer-motion";

export default function Portfolio({ data }) {
  const [enlarge, setEnlarge] = useState(false);
  const [image, setImage] = useState("");
  const imgRef = useRef<HTMLImageElement>();
  const controls = useAnimation();
  const canClose = useRef(false);
  const rect = useRef<DOMRect>();

  const handleLoad = async () => {
    await controls.start((i) => ({
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
      bottom: 0,
      height: "auto",
      width: "auto",
      borderRadius: 0,
    }));

    canClose.current = true;
  };

  useEffect(() => {
    if (!enlarge) return;
  }, [enlarge]);

  const handleClose = () => {
    if (!canClose.current) return;

    canClose.current = false;
    setEnlarge(false);
  };

  const setRef = (ref: HTMLImageElement) => {
    imgRef.current = ref;
    rect.current = imgRef.current.getBoundingClientRect();
  };

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
          {data.map((card) => {
            return (
              <Card
                key={card.id}
                img={card.img}
                name={card.name}
                setEnlarge={setEnlarge}
                setImage={setImage}
                setRef={setRef}
              />
            );
          })}
        </div>
      </div>
      <AnimatePresence>
        {enlarge && (
          <motion.div
            style={{
              position: "fixed",
              height: "100%",
              width: "100%",
              top: 0,
              left: 0,
            }}
            animate={{ background: "rgba(0, 0, 0, 0.8)" }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            exit={{ background: "rgba(0, 0, 0, 0)" }}
          >
            <motion.img
              onClick={(e) => e.stopPropagation()}
              onLoad={handleLoad}
              transition={{ type: "spring", duration: 0.5 }}
              src={`/me/ui/${image}.png`}
              style={{
                position: "absolute",
                maxWidth: "90%",
                maxHeight: "90%",
              }}
              initial={{
                width: rect.current.width,
                height: rect.current.height,
                left: rect.current.left,
                top: rect.current.top,
              }}
              animate={controls}
              exit={{
                width: rect.current.width,
                height: rect.current.height,
                left: rect.current.left,
                top: rect.current.top,
                borderRadius: "10px 10px 0 0",
                transform: "translate(0%, 0%)",
              }}
            ></motion.img>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export async function getServerSideProps() {
  const resp = await fetch("http://localhost:4000/me/api/images");
  const data = await resp.json();

  return { props: { data: data.reverse() } };
}
