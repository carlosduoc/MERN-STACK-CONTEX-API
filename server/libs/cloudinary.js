import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dcugkreqm",
  api_key: "533953324526932",
  api_secret: "JTkSqXb4GbBUvuEp-4f4uOOfwrc",
}); 

export const uploadImage = async (filePath) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: "post",
  });
};

export const deleteImage = async id =>{
    return await cloudinary.uploader.destroy(id)
}