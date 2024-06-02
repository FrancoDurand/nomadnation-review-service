import express from "express";
import cors from "cors";
import reviewRouter from "./routes/review-router";
import path from "path"

const app = express();
const port = 3003;

const mediaDir = path.join(__dirname, "../media");

app.use(cors());
app.use(express.json());
app.use("/media", express.static(mediaDir));

app.use(reviewRouter);

app.listen(port, () => {
    console.log(`Server is running on ${port} port`);
});