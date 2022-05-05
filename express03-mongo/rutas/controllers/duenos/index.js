const router = require("express").Router();
const { listar, obtenerUno, crear, actualizar } = require("../genericos");
const Dueno = require("./schema");

const listarHandler = listar( {Modelo: Dueno});
router.get("/", listarHandler );

const obtenerUnoHandler = obtenerUno({ Modelo: Dueno });
router.get("/:_id", obtenerUnoHandler);

const crearHandler = crear({ Modelo: Dueno });
router.post("/", crearHandler);

const editarHandler = actualizar({ Modelo:Dueno });
router.put("/:_id", editarHandler);

//const eliminarHandler = eliminar(entidad);
router.delete("/:_id", async (req, res) => {
  try {
    const { _id = null } = req.params;
    if (!_id) {
      return res.status(400).json({ mensaje: "Falta id" });
    }
    const resultado = await Dueno.remove({ _id });
    if (resultado.deletedCount === 1) {
      return res.status(204).send();
    }
    return res.status(500).json({ mensaje: "No se pudo eliminar" });
  } catch (error) {
    return res.status(500).json({ mensaje: error.message });
  }
});

module.exports = router;
