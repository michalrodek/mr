import {
  motion,
  useMotionValue,
  useTransform,
  useAnimation,
} from "framer-motion";
import { useEffect } from "react";

export default function Card(props) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-100, 0, 100], [-20, 0, 20]);
  const controls = useAnimation();

  const handleDragEnd = () => {
    if (x.getVelocity() > 500 || x.getVelocity() < -500) {
      const newCards = [...props.cards];
      newCards.unshift(newCards.pop());
      props.setCards(newCards);
    }
  };

  useEffect(() => {
    if (props.card !== "cards-small") return;

    setTimeout(() => {
      controls.start((i) => ({
        rotate: [null, 30, props.rotate],
        x: [0, 50, 0],
        transition: { duration: 1 },
      }));
    }, 2000);
  }, []);

  return (
    <motion.div
      style={{ rotate: props.rotate, position: "absolute", height: "100%" }}
    >
      <motion.div
        style={{
          rotate: rotate,
          cursor: "pointer",
          border: "5px solid var(--primary-400)",
          borderRadius: "20px",
          overflow: "hidden",
          display: "flex",
          x,
          height: "100%",
        }}
        whileTap={{ cursor: "grab" }}
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        onDragEnd={handleDragEnd}
        animate={controls}
        dragElastic={1}
      >
        <img
          draggable={false}
          src={`/me/ui/${props.card}.png`}
          height="100%"
        ></img>
      </motion.div>
    </motion.div>
  );
}
