import { readFile } from "fs";

export default async function images(req, res) {
  readFile("./public/images.json", "utf-8", (error, data) => {
    return res.status(200).json(data);
  });
}
