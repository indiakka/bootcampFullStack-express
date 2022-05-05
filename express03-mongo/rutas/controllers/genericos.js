const { v4: uuidv4 } = require("uuid");
const lodash = require("lodash");

const {
  crear,
  actualizar,
  eliminar,
  obtenerUno,
} = require("../../data-handler");

const listar = function closureListar({Modelo= null, populate= []}) {
  return async function closureHandlerListar(req, res) {
    try
    {
      if ( !Modelo )
      {
        throw new Error('No se envió modelo')
      }
      const filtro = filtrarEntidades(Modelo, req.query);
     let promesaLista = Modelo.find(filtro) 
      if ( Array.isArray( populate ) && populate.length > 0 )
      {
        for (const entidadAnidada of populate) {
                 promesaLista = promesaLista.populate(entidadAnidada)

        }
     }
     
      const resultados = await promesaLista
      return res.status(200).json(resultados);
    } catch (error) {
      return res.status(500).json({ mensaje: error.message });
    }
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

const eliminarEntidad = function closureEliminarEntidad(entidad) {
  return async function closureEliminarEntidad(req, res) {
    const { _id = null } = req.params;
    if (!_id) {
      return res.status(400).json({ mensaje: "Falta el id" });
    }
    if (!entidad) {
      res.status(404).status({ mensaje: "No encontrado" });
    }
    await eliminar({ directorioEntidad: entidad, nombreArchivo: _id });
    return res.status(204).send();
  };
};

const filtrarEntidades = (model, query) => {
  let queryResultado = lodash.cloneDeep(query);
  //lodash clona literalmente, por lo que al modificar, no hace cambios en el original
  for (let llave of Object.keys(queryResultado)) {
    //llave es donde se guardan todas las propiedades
    const instancia = lodash.get(model, `schema.paths.${llave}.instance`, null);
    if (instancia === null) {
      queryResultado[llave] = undefined;
      continue;
    }
    if (
      instancia === "ObjectID" ||
      instancia === "Date" ||
      instancia === "Number"
    ) {
      continue;
    }
    queryResultado[llave] = { $regex: query[llave], $options: "i" };
  }
  return queryResultado;
};

module.exports = {
  listar,
  obtenerUno: obtenerUnaEntidad,
  crear: crearEntidad,
  actualizar: editarEntidad,
  eliminar: eliminarEntidad,
  filtrarEntidades,
};
