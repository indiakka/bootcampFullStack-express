require('dotenv').config()

const express = require("express");
const rutas = require('./rutas')
const app = express();
const port = 5000;

app.use(express.json());
/*reformatea el request y
 lo convierte en un body*/
app.use(express.urlencoded());

rutas (app)

app.listen(port, () => {
  console.log(`API veterinaria está escuchando en http://localhost:${port}`);
}); 
