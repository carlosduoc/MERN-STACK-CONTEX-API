import express from "express";
import fileUpload from "express-fileupload";
import postsRouters from "./routes/posts.routes.js";
import {dirname, join} from "path"
import { fileURLToPath } from "url";
const app = express();
const  __direname = dirname(fileURLToPath(import.meta.url)); 

//midleware
app.use(express.json());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "./upload",
  })
);
//route
app.use(postsRouters);

console.log(__direname)
app.use(express.static(join(__direname, "../client/build")))

export default app;
