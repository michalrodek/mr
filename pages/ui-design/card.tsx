import Link from "next/link";
import { useRef } from "react";

export default function Card({ img, name, setEnlarge, setImage, setRef }) {
  const imgRef = useRef<HTMLImageElement>();

  const handleClick = (e, img) => {
    setImage(img);
    setEnlarge(true);
    setRef(imgRef.current);
  };

  return (
    <>
      <Link href={`/ui-design`} scroll={false}>
        <a
          onClick={(e) => handleClick(e, img)}
          className="border-8 border-white dark:border-primary-600 bg-white dark:bg-primary-600 rounded-2xl"
        >
          <img
            ref={imgRef}
            src={`/me/ui/${img}-small.png`}
            className="rounded-xl w-full"
          ></img>
          <div className="text-primary-900 justify-center flex py-4 font-poppins font-bold">
            {name}
          </div>
        </a>
      </Link>
    </>
  );
}
