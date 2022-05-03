const mongoose = require("mongoose");

const conexion = async () => {
  try {
    await mongoose.connect(process.env.Mongo_Url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conexión con DB correcta");
  } catch (error) {
    console.log("Error al conectarse a DB");
    console.log(error);
  }
};
module.exports = conexion;