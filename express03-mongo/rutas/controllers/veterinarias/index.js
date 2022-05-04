const router = require("express").Router();
const { filtrarEntidades } = require("../genericos");
const entidad = "veterinarias";
const Veterinaria = require("./schema");

//const listarHandler = listar(entidad);
router.get("/", async (req, res) => {
  try {
    const filtro = filtrarEntidades(Veterinaria, req.query);

    const veterinarias = await Veterinaria.find(filtro);
    return res.status(200).json(veterinarias);
  } catch (error) {
    return res.status(500).json({ mensaje: error.message });
  }
});

//const obtenerUnoHandler = obtenerUno(entidad);
router.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const veterinaria = await Veterinaria.findById(_id);
    if (veterinaria) {
      return res.status(200).json(veterinaria);
    }
    return res.status(404).json({ mensaje: "Veterinari@ no encontrada" });
  } catch (error) {
    return res.status(500).json({ mensaje: error.message });
  }
});

//const crearHandler = crear(entidad)
router.post("/", async (req, res) => {
  try {
    const veterinaria = new Veterinaria(req.body);
    await veterinaria.save();
    return res.status(200).json(veterinaria);
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
    const veterinariaActualizado = await Veterinaria.findOneAndUpdate(
      { _id },
      { $set: datosNuevos },
      { new: true, runValidators: true } // entrega los datos nuevos y verifica validaciones
    );
    return res.status(200).json(veterinariaActualizado);
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
    const resultado = await Veterinaria.remove({ _id });
    if (resultado.deletedCount === 1) {
      return res.status(204).send();
    }
    return res.status(500).json({ mensaje: "No se pudo eliminar" });
  } catch (error) {
    return res.status(500).json({ mensaje: error.message });
  }
});

module.exports = router;
