import { motion } from "framer-motion";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

interface CardProps {
  id: number;
  img: string;
  name: string;
  setEnlarge: Dispatch<SetStateAction<boolean>>;
  setImage: Dispatch<SetStateAction<string>>;
}

export default function Card(props: CardProps) {
  const handleClick = (e, img) => {
    props.setImage(img);
    props.setEnlarge(true);
  };

  return (
    <>
      <Link
        href={`/ui-design`}
        as={`/ui-design/${props.img}-${props.id}`}
        scroll={false}
      >
        <motion.a
          onClick={(e) => handleClick(e, props.img)}
          className="border-8 border-white dark:border-primary-600 bg-white dark:bg-primary-600 rounded-2xl"
          whileHover={{ cursor: "pointer", scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            src={`/me/ui/${props.img}-small.png`}
            className={`rounded-xl w-full`}
          ></img>
          <div className="text-primary-900 justify-center flex py-4 font-poppins font-bold">
            {props.name}
          </div>
        </motion.a>
      </Link>
    </>
  );
}
