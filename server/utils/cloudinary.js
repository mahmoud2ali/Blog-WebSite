const cloudinary = require("cloudinary");

cloudinary.config({
    cloud_name: "dkobkuovf",
    api_key:"638783739858354",
    api_secret: "rCqRFjZqJ7fmK6ACngEQLvRIIxw",
});

const cloudinaryUploadImage = async(fileToUpload) => {

    try {
        const data = await cloudinary.uploader.upload(fileToUpload, {
            resource_type: "auto"
        });
        return data;
    } catch(error) {
        return error;
    }

}

const cloudinaryremoveImage = async(imagePublicId) => {

    try {
       const result = await cloudinary.uploader.destroy(imagePublicId);
       return result;
    } catch(error) {
        return error;
    }

}

module.exports = {
    cloudinaryUploadImage,
    cloudinaryremoveImage
}
