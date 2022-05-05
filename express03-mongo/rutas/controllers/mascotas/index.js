const createError = require('http-errors')
const router = require( "express" ).Router();
const {
  listar,
  obtenerUno,
  crear,
  actualizar,
  eliminar,
} = require("../genericos");
const Mascota = require("./schema");
const Dueno = require("../duenos/schema");

const listarHandler = listar({ Modelo: Mascota, populate: ["dueno"] });
router.get("/", listarHandler);

const obtenerUnoHandler = obtenerUno({ Modelo: Mascota });
router.get("/:_id", obtenerUnoHandler);

const crearHandler = crear({ Modelo: Mascota });
router.post("/", async (req, res, next) => {
  const { dueno = null } = req.body;
  const existeDueno = await Dueno.exists({ _id: dueno });
  if (existeDueno) {
    return crearHandler(req, res);
  }
  const err = new createError[400]()
  next(err)
  });

const editarHandler = actualizar({ Modelo: Mascota });
router.put("/:_id", editarHandler);

const eliminarHandler = eliminar({ Modelo: Mascota });
router.delete("/:_id", eliminarHandler);

module.exports = router;
