const router = require("express").Router();
const { listar, obtenerUno, crear, actualizar, eliminar, existeDocumento } = require("../genericos");
const Dueno = require("./schema");

const listarHandler = listar( {Modelo: Dueno});
router.get("/", listarHandler );

const obtenerUnoHandler = obtenerUno({ Modelo: Dueno });
router.get("/:_id", obtenerUnoHandler);

const crearHandler = crear({ Modelo: Dueno });
const middlewareExisteDni = existeDocumento({Modelo: Dueno, campos: ['dni']})
router.post( "/", middlewareExisteDni, crearHandler );

const editarHandler = actualizar({ Modelo:Dueno });
const middlewareExisteEntidadConMismoDocumentoyDiferenteId = existeDocumento({
  Modelo: Dueno,
  campos: ["dni", { operador: "$ne", nombre: "_id" }],
});
router.put( "/:_id",middlewareExisteEntidadConMismoDocumentoyDiferenteId, editarHandler );

const eliminarHandler = eliminar({ Modelo: Dueno });
router.delete("/:_id", eliminarHandler);

module.exports = router;
