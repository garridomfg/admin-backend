const fs = require("fs");
const User = require("../models/user.model");
const Doctor = require("../models/doctor.model");
const Hospital = require("../models/hospital.model");

const deleteImage = (path) => {
  if (fs.existsSync(path)) {
    // Delete the old image
    fs.unlinkSync(path);
  }
};

const updateImage = async (collection, id, fileName) => {
  let oldPath = "";
  switch (collection) {
    case "doctors":
      const doctor = await Doctor.findById(id);
      if (!doctor) {
        console.log("There is no doctor by id");
        return false;
      }

      oldPath = `./uploads/doctors/${doctor.img}`;
      deleteImage(oldPath);

      doctor.img = fileName;
      await doctor.save();
      return true;
    case "hospitals":
      const hospital = await Hospital.findById(id);
      if (!hospital) {
        console.log("There is no hospital by id");
        return false;
      }

      oldPath = `./uploads/hospitals/${hospital.img}`;
      deleteImage(oldPath);

      hospital.img = fileName;
      await hospital.save();
      return true;
    case "users":
      const user = await User.findById(id);
      if (!user) {
        console.log("There is no user by id");
        return false;
      }

      oldPath = `./uploads/users/${user.img}`;
      deleteImage(oldPath);

      user.img = fileName;
      await user.save();
      return true;
  }
};

module.exports = {
  updateImage,
};
