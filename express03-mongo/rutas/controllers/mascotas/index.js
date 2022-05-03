const router = require("express").Router();
const {
  // listar,
  //obtenerUno,
  // crear,
  //actualizar,
  eliminar,
} = require("../genericos");
const entidad = "mascotas";
const Mascota = require("./schema");

//const listarHandler = listar(entidad);
router.get("/", async (req, res) => {
  try {
    const mascotas = await Mascota.find();
    return res.status(200).json(mascotas);
  } catch (error) {
    return res.status(500).json({ mensaje: error.message });
  }
});

//const obtenerUnoHandler = obtenerUno(entidad);
router.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const mascota = await Mascota.findById(_id);
    if (mascota) {
      return res.status(200).json(mascota);
    }
    return res.status(404).json({ mensaje: "Mascota no encontrada" });
  } catch (error) {
    return res.status(500).json({ mensaje: error.message });
  }
});

//const crearHandler = crear(entidad)
router.post("/", async (req, res) => {
  try {
    const mascota = new Mascota(req.body);
    await mascota.save();
    return res.status(200).json(mascota);
  } catch (error) {
    return res.status(500).json({ mensaje: error.message });
  }
});

//const editarHandler = actualizar(entidad);
router.put("/:_id", async (req, res) => {
  try {
    const { _id = null } = req.params;
    const { body = {} } = req;
    const { _id: id, ...datosNuevos } = req.body;
    // separamos el id de los demás datos
    if (!_id) {
      return res.status(400).json({ mensaje: "Falta id" });
    }
    const mascotaActualizada = await Mascota.findOneAndUpdate(
      { _id },
      { $set: datosNuevos },
      { new: true, runValidators:true } // entrega los datos nuevos y verifica validaciones
    );
    return res.status(200).json(mascotaActualizada);
  } catch (error) {
    return res.status(500).json({ mensaje: error.message });
  }
});

const eliminarHandler = eliminar(entidad);
router.delete("/:_id", eliminarHandler);

module.exports = router;