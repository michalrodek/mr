import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Id() {
  const router = useRouter();
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (!router.query.id) return;

    const fetchData = async () => {
      const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images`);
      const data = await resp.json();

      const arr = (router.query.id as string).split("-");
      const id = arr[arr.length - 1];

      const image = data.find((image) => {
        if (image.id == id) {
          return true;
        }
      });

      setImage(image);
    };

    fetchData();
  }, [router.query.id]);

  if (!image) return null;

  return (
    <>
      <Head>
        <title>Michal Rodek</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <img src={`/me/ui/${image?.img}.png`}></img>
    </>
  );
}
