import Head from "next/head";
import { useEffect, useState } from "react";
import { images } from "../utils/paths";
import Link from "next/link";
// import Card from "../components/card";

interface Cards {
  name: string;
  rotate: number;
}

export default function Home() {
  const [cards, setCards] = useState<Cards[]>();

  useEffect(() => {
    setCards([
      { name: "menu-small", rotate: rotateDegree() },
      { name: "login-small", rotate: rotateDegree() },
      { name: "features-small", rotate: rotateDegree() },
      { name: "cards-small", rotate: rotateDegree() },
    ]);
  }, []);

  const rotateDegree = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <>
      <Head>
        <title>Michal Rodek</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex flex-col gap-12 md:gap-40 md:flex-row md:flex-auto justify-center items-center">
        <div className="flex justify-center">
          <img
            src="/me/pic.png"
            width={400}
            height={408}
            className="me"
            alt="Photo"
          ></img>
        </div>
        <div
          style={{ color: "var(--text)" }}
          className="flex flex-col items-center max-w-md gap-8 md:gap-14"
        >
          <div className="md:self-start md:gap-2 md:flex md:flex-col">
            <span className="text-xs font-poppins font-bold md:text-sm">
              FRONTEND DEVELOPER
            </span>
            <h1 className="font-poppins font-bold text-2xl md:text-5xl text-primary-800 dark:text-primary-300">
              Michal Rodek
            </h1>
          </div>
          <div className="leading-8">
            <p>Ahoj 👋,</p>
            <div className="flex flex-col gap-4">
              <p>
                jmenuji se Michal, pracuji jako frontend developer, ale když je
                třeba, umím zasáhnout také do backendu.
              </p>
              <p>
                Líbí se mi i UI/UX design a občas si zkouším navrhovat{" "}
                <Link href="/ui-design">
                  <a className="underline">vlastní komponenty</a>
                </Link>
                .
              </p>
            </div>
          </div>
          {/* {false && (
            <div
              style={{ position: "relative", height: "10rem", width: "13rem" }}
            >
              {cards?.map((card) => {
                return (
                  <Card
                    key={card.name}
                    card={card.name}
                    cards={cards}
                    setCards={setCards}
                    rotate={card.rotate}
                  />
                );
              })}
            </div>
          )} */}
        </div>
      </div>
    </>
  );
}

export function getStaticProps() {
  const names = images().reverse();

  return { props: { data: names } };
}
