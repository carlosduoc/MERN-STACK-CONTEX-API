import mongosse from "mongoose";

const postschema = new mongosse.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    url: String,
    public_id: String,
  },
});

export default mongosse.model("post", postschema);
