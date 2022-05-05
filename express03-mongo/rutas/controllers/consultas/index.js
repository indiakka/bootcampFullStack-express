const router = require("express").Router();
const { listar, obtenerUno, crear } = require("../genericos");
const Consulta = require("./schema");

const listarHandler = listar({
  Modelo: Consulta,
  populate: ["mascota", "veterinaria"],
});
router.get("/", listarHandler);

const obtenerUnoHandler = obtenerUno({ Modelo: Consulta });
router.get("/:_id", obtenerUnoHandler);

const crearHandler = crear({ Modelo: Consulta });
router.post("/", crearHandler);

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
    const consultaActualizado = await Consulta.findOneAndUpdate(
      { _id },
      { $set: datosNuevos },
      { new: true, runValidators: true } // entrega los datos nuevos y verifica validaciones
    );
    return res.status(200).json(consultaActualizado);
  } catch (error) {
    return res.status(500).json({ mensaje: error.message });
  }
});

//const eliminarHandler = eliminar(entidad);
router.delete("/:_id", async (req, res) => {
  try {
    const { _id = null } = req.params;
    if (!_id) {
      return res.status(400).json({ mensaje: "Falta id" });
    }
    const resultado = await Consulta.remove({ _id });
    if (resultado.deletedCount === 1) {
      return res.status(204).send();
    }
    return res.status(500).json({ mensaje: "No se pudo eliminar" });
  } catch (error) {
    return res.status(500).json({ mensaje: error.message });
  }
});

module.exports = router;
