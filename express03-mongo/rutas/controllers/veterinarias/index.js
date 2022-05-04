const router = require("express").Router();
const {
  // listar,
  //obtenerUno,
  // crear,
  //actualizar,
  //eliminar,
} = require("../genericos");
const entidad = "duenos";
const Dueno = require("./schema");

//const listarHandler = listar(entidad);
router.get("/", async (req, res) => {
  try {
    const duenos = await Dueno.find();
    return res.status(200).json(duenos);
  } catch (error) {
    return res.status(500).json({ mensaje: error.message });
  }
});

//const obtenerUnoHandler = obtenerUno(entidad);
router.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const dueno = await Dueno.findById(_id);
    if (dueno) {
      return res.status(200).json(dueno);
    }
    return res.status(404).json({ mensaje: "Dueñ@ no encontrada" });
  } catch (error) {
    return res.status(500).json({ mensaje: error.message });
  }
});

//const crearHandler = crear(entidad)
router.post("/", async (req, res) => {
  try {
    const dueno = new Dueno(req.body);
    await dueno.save();
    return res.status(200).json(dueno);
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
    const duenoActualizado = await Dueno.findOneAndUpdate(
      { _id },
      { $set: datosNuevos },
      { new: true, runValidators: true } // entrega los datos nuevos y verifica validaciones
    );
    return res.status(200).json(duenoActualizado);
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
