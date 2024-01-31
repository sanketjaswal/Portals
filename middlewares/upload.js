const multer = require('multer');

// setting up multer Engine
const storage = multer.diskStorage({});
const upload = multer({ storage: storage });

module.exports = upload;
