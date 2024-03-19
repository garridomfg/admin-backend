const path = require("path");
const fs = require("fs");
const { response } = require("express");
const { v4: uuidv4 } = require("uuid");
const { updateImage } = require("../helpers/update-image");

const fileUpload = (req, res = response) => {
  const collection = req.params.collection;
  const id = req.params.id;

  // Validate collections
  const validCollections = ["hospitals", "users", "doctors"];

  if (!validCollections.includes(collection)) {
    return res.status(400).json({
      ok: false,
      msg: "Its not a valid collection",
    });
  }

  // Validate files
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).json({
      ok: false,
      msg: "No files were uploaded",
    });
  }

  const file = req.files.image;

  // Validate file extensions
  const splittedName = file.name.split(".");
  const fileExtension = splittedName[splittedName.length - 1];

  const validExtensions = ["jpg", "png", "jpeg", "gif"];

  if (!validExtensions.includes(fileExtension)) {
    return res.status(400).json({
      ok: false,
      msg: "Its not a valid extension",
    });
  }

  // Generate file name
  const fileName = `${uuidv4()}.${fileExtension}`;

  // Generate path to save image
  const path = `./uploads/${collection}/${fileName}`;

  // Use the mv() method to place the file
  file.mv(path, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        ok: false,
        msg: "Error to place the image",
      });
    }

    // Update DB
    updateImage(collection, id, fileName);

    res.json({
      ok: true,
      msg: "File uploaded",
      fileName,
    });
  });
};

const getImg = (req, res = response) => {
  const collection = req.params.collection;
  const img = req.params.img;

  const pathImg = path.join(__dirname, `../uploads/${collection}/${img}`);

  if (fs.existsSync(pathImg)) {
    res.sendFile(pathImg);
  } else {
    // Default img
    const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
    res.sendFile(pathImg);
  }
};

module.exports = {
  fileUpload,
  getImg,
};
