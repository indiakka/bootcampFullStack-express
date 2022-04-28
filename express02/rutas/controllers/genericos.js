const { v4: uuidv4 } = require("uuid");

const {
  crear,
  listar,
  actualizar,
  eliminar,
  obtenerUno,
} = require("../../data-handler");

const listarEntidades = function closureListar(entidad) {
  return async function closureHandlerListar(req, res) {
    if (!entidad) {
      res.status(404).status({ mensaje: "no encontrado" });
    }
    const mascotas = await listar({ directorioEntidad: entidad });
    res.status(200).json(mascotas);
  };
};

const obtenerUnaEntidad = function closureObtenerUno(entidad) {
  return async function closureObtenerUno(req, res) {
    const { _id = null } = req.params;

    if (!_id) {
      return res.status(400).json({ mensaje: "Falta el id" });
    }
    if (!entidad) {
      res.status(404).status({ mensaje: "No encontrado" });
    }
    const _entidad = await obtenerUno({
      directorioEntidad: entidad,
      nombreArchivo: _id,
    });
    if (_entidad) {
      return res.status(200).json(_entidad);
    }
    res.status(404).json({ mensaje: "No encontrado" });
  };
};

const crearEntidad = function closureCrearEntidad(entidad) {
  return async function closureCrearEntidad(req, res) {
    if (!entidad) {
      res.status(404).status({ mensaje: "No encontrado" });
    }
    if (req.body && Object.keys(req.body).length > 0) {
      const _id = uuidv4();
      const datosMascotaNueva = { ...req.body, _id };
      const nuevaMascota = await crear({
        directorioEntidad: entidad,
        nombreArchivo: _id,
        datosGuardar: datosMascotaNueva,
      });
      return res.status(200).json(nuevaMascota);
    }
    return res.status(400).json({ mensaje: "Falta el body" });
  };
};

const editarEntidad = function closureEditarEntidad(entidad) {
  return async function closureEditarEntidad(req, res) {
    const { _id = null } = req.params;
    if (!_id) {
      return res.status(400).json({ mensaje: "Falta el id" });
    }
    if (!entidad) {
      res.status(404).status({ mensaje: "No encontrado" });
    }
    if (req.body && Object.keys(req.body).length > 0) {
      const datosActuales = { ...req.body, _id };
      const mascotaActualizada = await actualizar({
        directorioEntidad: entidad,
        nombreArchivo: _id,
        datosActuales,
      });
      return res.status(200).json(mascotaActualizada);
    }
    return res.status(400).json({ mensaje: "Falta el body" });
  };
};

module.exports = {
  listar: listarEntidades,
  obtenerUno: obtenerUnaEntidad,
  crear: crearEntidad,
  actualizar: editarEntidad,
};
