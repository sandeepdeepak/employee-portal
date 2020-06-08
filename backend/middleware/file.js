const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file);
    cb(null, "resumes");
  },
  filename: (req, file, cb) => {
    const name = Date.now() + file.originalname;
    cb(null, name);
  },
});

module.exports = multer({ storage: storage }).single("resume");
