const mongoose = require("mongoose");
const { Schema } = mongoose;

const usuarioSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    apellido: {
      type: String,
      required: true,
    },
    dni: {
      type: String,
      required: true,
    },
    tipo: {
      type: String,
      required: true,
      enum: ["dueno", "veterinaria", "administrador"],
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: (mail) => {
          if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return true;
          }
          return false;
        },
        message: "El formato del email, no es correcto",
      },
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("usuario", usuarioSchema);
