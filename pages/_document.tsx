import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="cs">
      <Head>
        <meta name="description" content="Michal Rodek - frontend developer" />
        <link rel="icon" href="/me/logo.svg" type="image/svg+xml" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function () {
              if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark')
              } else {
                document.documentElement.classList.remove('dark')
              }
            })()
          `,
          }}
        ></script>
      </body>
    </Html>
  );
}
