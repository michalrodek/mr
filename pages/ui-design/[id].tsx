import { useRouter } from "next/router";
import Head from "next/head";
import { getFiles } from "../../utils/paths";

export default function Id({ data }) {
  const router = useRouter();

  if (router.query.id) {
    return (
      <>
        <Head>
          <title>Michal Rodek</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <img
          style={{ width: "100%" }}
          src={`/me/ui/${router.query.id}.png`}
        ></img>
      </>
    );
  } else {
    return "";
  }
}

export async function getStaticPaths() {
  const files = await getFiles();

  const paths = files.map((file) => {
    const name = file.replace(".png", "");

    return { params: { id: name } };
  });

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return {
    props: {
      data: params.id,
    },
  };
}
