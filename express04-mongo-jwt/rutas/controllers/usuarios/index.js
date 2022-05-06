const router = require("express").Router();
const Usuario = require("./schema");

const {
  listar,
  obtenerUno,
  crear,
  actualizar,
  eliminar,
  existeDocumento,
} = require("../genericos");

const listarHandler = listar({ Modelo: Usuario });
router.get("/", listarHandler);

const obtenerUnoHandler = obtenerUno({ Modelo: Usuario });
router.get("/:_id", obtenerUnoHandler);

const crearHandler = crear({ Modelo: Usuario });
const middlewareExisteDocumento = existeDocumento({
  Modelo: Usuario,
  campos: ["dni"],
});
router.post("/", middlewareExisteDocumento, crearHandler);

const editarHandler = actualizar({ Modelo: Usuario });
const middlewareExisteEntidadConMismoDocumentoyDiferenteId = existeDocumento({
  Modelo: Usuario,
  campos: ["dni", { operador: "$ne", nombre: "_id" }],
});
router.put(
  "/:_id",
  middlewareExisteEntidadConMismoDocumentoyDiferenteId,
  editarHandler
);

const eliminarHandler = eliminar({ Modelo: Usuario });
router.delete("/:_id", eliminarHandler);

module.exports = router;
