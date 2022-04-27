const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("La API está funcionando sin problema");
});

app.get("/mascotas", (req, res) => {
  const mascotas = [
    {
      tipo: "Perro",
      nombre: "Trosky0",
      dueno: "Camilo",
    },
    {
      tipo: "Perro",
      nombre: "Trosky1",
      dueno: "Camilo",
    },
    {
      tipo: "Perro",
      nombre: "Trosky2",
      dueno: "Camilo",
    },
    {
      tipo: "Perro",
      nombre: "Trosky3",
      dueno: "Camilo",
    },
    {
      tipo: "Perro",
      nombre: "Trosky5",
      dueno: "Camilo",
    },
  ];
  res.status(200).json(mascotas);
});

app.listen(port, () => {
  console.log("API veterinaria está escuchando en http://localhost:${port}");
});
