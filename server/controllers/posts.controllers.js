import Post from "../models/post.js";
import { deleteImage, uploadImage } from "../libs/cloudinary.js";
import fs from "fs-extra";

export const getPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.send(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const createPosts = async (req, res) => {
  try {
    
    const { title, description } = req.body;
    let image;''

    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
      await fs.remove(req.files.image.tempFilePath);
    }

    const newpost = new Post({ title, description, image });
    await newpost.save();
    return res.send(newpost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const updatePosts = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    //console.log(post);
    return res.send(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePosts = async (req, res) => {
  try {
    const postRemove = await Post.findByIdAndDelete(req.params.id);
    if (!postRemove) return res.sendStatus(404);
    if (postRemove.image.public_id) {
      await deleteImage(postRemove.image.public_id);
    }

    return res.send("Post Eliminado");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPostUnic = async (req, res) => {
  try {
    const postunic = await Post.findById(req.params.id);

    if (!postunic) return res.sendStatus(404);
    return res.json(postunic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
