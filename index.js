import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { suggestions, characters } from "./data.js";

dotenv.config();

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const urlPrefix = "/api/v1";

app.get(`${urlPrefix}/characters`, (req, res) => {
  res.json(shuffle(characters));
});

app.get(`${urlPrefix}/character/:id`, (req, res) => {
  const character = characters.find((char) => char.id == req.params.id);
  res.json(character);
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
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
