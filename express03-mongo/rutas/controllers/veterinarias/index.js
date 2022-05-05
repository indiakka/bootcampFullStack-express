const router = require("express").Router();
const { listar, obtenerUno, crear, actualizar, eliminar } = require("../genericos");
const Veterinaria = require("./schema");

const listarHandler = listar({ Modelo: Veterinaria });
router.get("/", listarHandler);

const obtenerUnoHandler = obtenerUno({ Modelo: Veterinaria });
router.get("/:_id", obtenerUnoHandler);

const crearHandler = crear({ Modelo: Veterinaria });
router.post("/", crearHandler);

const editarHandler = actualizar({ Modelo:Veterinaria });
router.put("/:_id", editarHandler);

const eliminarHandler = eliminar({ Modelo: Veterinaria });
router.delete("/:_id", eliminarHandler);

module.exports = router;
