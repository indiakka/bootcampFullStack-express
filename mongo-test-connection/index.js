const uri =
  "mongodb+srv://indiakka:Pesadillaantesdenavidad2912@cluster0.ipshy.mongodb.net/VetWeb?retryWrites=true&w=majority";

const mongoose = require("mongoose");

(async () => {
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
})();

const Schema = mongoose.Schema;

const BlogPost = new Schema({
  title: String,
  body: String,
  date: Date,
});

const BlogPostModel = mongoose.model("blogpost", BlogPost);

const blogpost = new BlogPostModel({
  title: "titulo2",
  body: "esto es un blog post 2",
  date: new Date(),
});

(async () => {
  await blogpost.save(); //espera a guardar el documento
  await mongoose.disconnect(); // cierra la conexión
})();
