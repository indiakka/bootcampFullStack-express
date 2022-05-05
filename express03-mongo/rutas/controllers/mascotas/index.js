const router = require("express").Router();
const { listar, obtenerUno, crear, actualizar, eliminar } = require("../genericos");
const Mascota = require("./schema");

const listarHandler = listar({Modelo: Mascota, populate: ['dueno']});
router.get("/", listarHandler );

const obtenerUnoHandler = obtenerUno({Modelo: Mascota});
router.get("/:_id", obtenerUnoHandler);

const crearHandler = crear({ Modelo: Mascota });
router.post("/", crearHandler);

const editarHandler = actualizar({ Modelo: Mascota });
router.put("/:_id", editarHandler)


const eliminarHandler = eliminar({ Modelo: Mascota });
router.delete("/:_id", eliminarHandler);

module.exports = router;
