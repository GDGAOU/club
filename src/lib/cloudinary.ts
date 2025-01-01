import { v2 as cloudinary } from "cloudinary";

if (!process.env.CLOUDINARY_URL) {
  cloudinary.config({
    cloud_name: "dvpqtvunr",
    api_key: "528382933568121",
    api_secret: "FW5kwVe1aYydXAK-Fu-zr4fDkVA",
  });
} else {
  // If CLOUDINARY_URL is set, it will automatically configure cloudinary
  cloudinary.config({
    secure: true
  });
}

export { cloudinary };
