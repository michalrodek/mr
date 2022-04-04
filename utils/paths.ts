import { promises as fs } from "fs";

export async function getFiles() {
  const folderContent = await fs.readdir("./public/ui");
  const files = folderContent.filter((file) => !file.includes("small"));

  return files;
}

export function images() {
  return [
    {
      id: 1,
      name: "Login",
      img: "login",
    },
    {
      id: 2,
      name: "Cards",
      img: "cards",
    },
    {
      id: 3,
      name: "Contact Card",
      img: "contact-card",
    },
    {
      id: 4,
      name: "Features",
      img: "features",
    },
    {
      id: 5,
      name: "Menu",
      img: "menu",
    },
    {
      id: 6,
      name: "Navbar",
      img: "navbar",
    },
    {
      id: 7,
      name: "Modal",
      img: "modal",
    },
  ];
}
