const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { crear, listar, actualizar, eliminar } = require("../data-handler");
const app = express();
const port = 5000;

app.use(express.json());
/*reformatea el request y
 lo convierte en un body*/
app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.send("La API está funcionando sin problema");
});

app.get("/mascotas", async (req, res) => {
  const mascotas = await listar({ directorioEntidad: "mascotas" });
  res.status(200).json(mascotas);
});

app.post("/mascotas", async (req, res) => {
  if (req.body && Object.keys(req.body).length > 0) {
    const _id = uuidv4();
    const datosMascotaNueva = { ...req.body, _id };
    const nuevaMascota = await crear({
      directorioEntidad: "mascotas",
      nombreArchivo: _id,
      datosGuardar: datosMascotaNueva,
    });
    return res.status(200).json(nuevaMascota);
  }
  return res.status(400).json({ mensaje: "Falta el body" });
});

app.put("/mascotas/:_id", async (req, res) => {
  const { _id = null } = req.params;
  if (!_id) {
    return res.status(400).json({ mensaje: "Falta el body" });
  }
  if (req.body && Object.keys(req.body).length > 0) {
    const datosActuales = { ...req.body, _id };
    const mascotaActualizada = await actualizar({
      directorioEntidad: "mascotas",
      nombreArchivo: _id,
      datosActuales,
    });
    return res.status(200).json(mascotaActualizada);
  }
  return res.status(400).json({ mensaje: "Falta el body" });
});

app.delete("/mascotas/:_id", async (req, res) => {
  const { _id = null } = req.params;
  if (!_id) {
    return res.status(400).json({ mensaje: "Falta el body" });
  }
  await eliminar({ directorioEntidad: "mascotas", nombreArchivo: _id });
  return res.status(204).send();
});

app.listen(port, () => {
  console.log(`API veterinaria está escuchando en http://localhost:${port}`);
});
