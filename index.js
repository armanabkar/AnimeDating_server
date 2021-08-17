import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { join, dirname } from "path";
import cors from "cors";
import { suggestions, characters } from "./data.js";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const urlPrefix = "/api/v1";

app.use("/images", express.static(join(__dirname, "images")));

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

app.get(`${urlPrefix}/characters`, (req, res) => {
  res.json(shuffle(characters));
});

app.get(`${urlPrefix}/character/:id`, (req, res) => {
  const character = characters.find((char) => char.id == req.params.id);

  if (character) {
    res.json({ character });
  } else {
    res.status(404);
    throw new Error("Character not found");
  }
});

app.get(`${urlPrefix}/suggestions`, (req, res) => {
  res.json(shuffle(suggestions));
});

function shuffle(array) {
  var currentIndex = array.length,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  process.env.NODE_ENV === "development" &&
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
);
