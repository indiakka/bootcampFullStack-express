const router = require("express").Router();
const { listar, obtenerUno, crear, actualizar, eliminar } = require("../genericos");
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

const editarHandler = actualizar({ Modelo: Consulta });
router.put( "/:_id", editarHandler );


const eliminarHandler = eliminar({ Modelo: Consulta });
router.delete( "/:_id", eliminarHandler );

module.exports = router;
