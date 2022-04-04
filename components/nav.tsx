import { useEffect, useState, useRef } from "react";
import ActiveLink from "./link";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

export default function Nav() {
  const [isDark, setIsDark] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const nav = useRef<HTMLDivElement>();
  const links = [
    { text: "Úvod", href: "/" },
    { text: "Kontakt", href: "/kontakt/" },
    { text: "UI design", href: "/ui-design/" },
  ];

  useEffect(() => {
    setIsDark(
      localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  }, []);

  const handleToggleTheme = () => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.toggle("dark");
    } else {
      document.documentElement.classList.toggle("dark");
    }

    if (isDark) {
      setIsDark(false);
      localStorage.theme = "light";
    } else {
      setIsDark(true);
      localStorage.theme = "dark";
    }
  };

  return (
    <nav className="flex items-center justify-between px-4" ref={nav}>
      <Link href="/">
        <a>
          <img src="/me/logo.svg" width={40} height={22} alt="Home"></img>
        </a>
      </Link>
      <ul className="hidden md:flex md:gap-4">
        {links.map((link, index) => {
          return (
            <li key={index}>
              <ActiveLink
                activeClassName={
                  "bg-primary-100 dark:bg-primary-800 font-poppins font-bold text-primary-700 dark:text-primary-300"
                }
                href={link.href}
              >
                <a
                  className={
                    "transition py-2 px-4 rounded-lg text-primary-700 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-800"
                  }
                >
                  {link.text}
                </a>
              </ActiveLink>
            </li>
          );
        })}
      </ul>
      {/* {false && (
        <Link href="/ui-design">
          <motion.a
            href="/ui-design"
            className={styles.cta}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 8px 20px -5px rgba(0, 0, 0, 0.36)",
            }}
            whileTap={{ scale: 1 }}
          >
            UI design
          </motion.a>
        </Link>
      )} */}
      <div className="flex gap-5 md:gap-0">
        <button
          aria-label="Menu"
          onClick={handleToggleTheme}
          className="text-primary-800 dark:text-primary-300"
          style={{
            display: "flex",
            alignItems: "center",
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          {isDark ? <Sun /> : <Moon />}
        </button>
        <button
          aria-label="Toggle dark mode"
          className="text-primary-800 dark:text-primary-300"
          style={{
            background: "none",
            border: "none",
            alignItems: "center",
            display: "flex",
          }}
          onClick={() => (openMenu ? setOpenMenu(false) : setOpenMenu(true))}
        >
          <Menu />
        </button>
      </div>
      <AnimatePresence>
        {openMenu && (
          <motion.div
            style={{
              position: "absolute",
              width: "100%",
              top: nav.current.offsetHeight + "px",
              left: 0,
              opacity: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2rem",
              fontSize: "1.5rem",
              padding: "3rem 0",
              zIndex: 1,
            }}
            className="bg-white dark:bg-primary-1000"
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {links.map((link, i) => {
              return (
                <motion.li
                  style={{
                    listStyle: "none",
                    translateX: 50,
                  }}
                  onClick={() => setOpenMenu(false)}
                  animate={{ translateX: 0 }}
                  transition={{ delay: i / 20 }}
                >
                  <Link href={link.href}>
                    <a>{link.text}</a>
                  </Link>
                </motion.li>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

const Menu = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 md:hidden"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
};

const Sun = () => {
  return (
    <svg
      height={24}
      width={24}
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  );
};

const Moon = () => {
  return (
    <svg
      height={24}
      width={24}
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  );
};
