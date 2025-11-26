import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const parts = file.originalname.split(".");
    const ext = parts.length > 1 ? "." + parts.pop() : "";
    const base = parts.join(".");

    const filename = `${base}-${Date.now()}${ext}`;

    cb(null, filename);
  },
});

const upload = multer({ storage });
export default upload;
