import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import router from "./src/routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 4000;

const corsOption = {
  origin: `http://localhost:${PORT}`,
  credentials: true,
};

app.use(router);
app.use(cors(corsOption));
app.use(express.static("."));
app.use(express.json());
app.use(express.urlencoded());

app.listen(PORT, () => {
  console.log(`Application is listening on port ${PORT}!`);
});
