const router = require("express").Router();
const { listar, obtenerUno, crear, actualizar, eliminar, existeDocumento } = require("../genericos");
const Veterinaria = require("./schema");

const listarHandler = listar({ Modelo: Veterinaria });
router.get("/", listarHandler);

const obtenerUnoHandler = obtenerUno({ Modelo: Veterinaria });
router.get("/:_id", obtenerUnoHandler);

const crearHandler = crear({ Modelo: Veterinaria });
const middlewareExisteDni = existeDocumento({ Modelo: Veterinaria, campos: ["documento"] });
router.post("/", middlewareExisteDni, crearHandler);

const editarHandler = actualizar({ Modelo: Veterinaria });
const middlewareExisteEntidadConMismoDocumentoyDiferenteId = existeDocumento({
  Modelo: Veterinaria,
  campos: ["documento", { operador: "$ne", nombre: "_id" }],
});
router.put(
  "/:_id",
  middlewareExisteEntidadConMismoDocumentoyDiferenteId,
  editarHandler
);


const eliminarHandler = eliminar({ Modelo: Veterinaria });
router.delete("/:_id", eliminarHandler);

module.exports = router;
