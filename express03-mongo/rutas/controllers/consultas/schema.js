const mongoose = require("mongoose");
const { Schema } = mongoose;

const consultaSchema = new Schema({
  mascota: {
    type: "ObjectId",
    ref: "Mascota",
  },
  veterinaria: {
    type: "ObjectId",
    ref: "Veterinaria",
  },
  historia: {
    type: String,
    required: true,
  },
  diagnostico: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("consultas", consultaSchema);
