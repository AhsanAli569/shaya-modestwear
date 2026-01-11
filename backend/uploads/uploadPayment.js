import multer from "multer";
import path from "path";

// Storage Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() +
        "_" +
        Math.round(Math.random() * 1e9) +
        path.extname(file.originalname)
    );
  },
});

// Multer Upload
const upload = multer({ storage });

// --------------
// FIXED WRAPPER
// --------------
// If NO file is uploaded -> DO NOT block req.body
export default {
  single: (fieldName) => (req, res, next) => {
    upload.single(fieldName)(req, res, (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      // Multer normally clears req.body when file missing.
      // This FIX ensures req.body stays intact.
      if (!req.file) {
        // Force body to remain available
        req.body = req.body || {};
      }

      next();
    });
  },
};
