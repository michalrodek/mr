import "../styles/globals.css";
import Nav from "../components/nav";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <div className="layout text-primary-700 dark:bg-primary-1000 dark:text-primary-500 font-poppins transition">
        <div></div>
        <Nav />
        <div></div>
        <div></div>
        <main className="px-12 py-8 rounded-3xl flex flex-col bg-primary-100 dark:bg-primary-950 relative transition">
          <Component {...pageProps} />
        </main>
        <div></div>
        <div></div>
        <footer></footer>
        <div></div>
      </div>
    </>
  );
}

export default MyApp;
