import "./db.js";
import { PORT } from "./config.js";
import app from "./app.js"


app.listen( PORT);
console.log("Servidor ejecutandose en el puerto",PORT);
