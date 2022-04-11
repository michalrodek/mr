import { useState } from "react";
import Alert from "../components/toast";
import Head from "next/head";
import { AnimatePresence } from "framer-motion";

interface Toast {
  message: string;
  bgColor?: string;
  color?: string;
}

export default function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState<Toast>({
    message: "",
    bgColor: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    setShowToast(true);
    setToastMessage({ message: "Posílám..." });

    const sendEmail = async () => {
      const resp = await fetch("https://michalrodek.cz/mailer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: email,
          message: message,
        }),
      });

      if (resp.ok) {
        setToastMessage({
          message: "E-Mail byl odeslán.",
          bgColor: "var(--primary-700)",
          color: "white",
        });
      } else {
        setToastMessage({
          message: "Nastala chyba během posílání E-Mailu.",
          bgColor: "var(--accent-500)",
        });
      }
    };

    sendEmail();
  };

  return (
    <>
      <Head>
        <title>Kontakt | Michal Rodek</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex flex-col gap-12 md:gap-40 md:flex-row md:items-center md:justify-center md:flex-auto">
        <h1 className="text-3xl font-poppins font-bold text-center text-primary-800 dark:text-primary-300">
          Zanech mi zprávu
        </h1>
        <form
          className="p-12 rounded-xl flex flex-col gap-8 md:flex-auto md:max-w-sm bg-white dark:bg-primary-600"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-1">
            <label
              className="font-poppins font-bold text-sm dark:text-primary-900"
              htmlFor="email"
            >
              E-MAIL
            </label>
            <input
              className="rounded-xl p-4 w-full dark:text-primary-900 bg-primary-100"
              id="email"
              onChange={(e) => setEmail(e.currentTarget.value)}
              required
            ></input>
          </div>
          <div className="flex flex-col gap-1">
            <label
              className="font-poppins font-bold text-sm dark:text-primary-900"
              htmlFor="message"
            >
              ZPRÁVA
            </label>
            <textarea
              className="rounded-xl p-4 w-full h-40 resize-none dark:text-primary-900 bg-primary-100"
              id="message"
              onChange={(e) => setMessage(e.currentTarget.value)}
              required
            ></textarea>
          </div>
          <button className="text-white font-poppins font-bold p-4 rounded-xl w-full bg-primary-800">
            Odeslat
          </button>
        </form>
      </div>
      <AnimatePresence>
        {showToast && (
          <Alert state={toastMessage} close={() => setShowToast(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
