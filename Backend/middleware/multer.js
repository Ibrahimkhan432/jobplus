import multer from 'multer';
const storage = multer.memoryStorage();

export const profileAndResumeUpload = multer({ storage }).fields([
  { name: "profilePhoto", maxCount: 1 },
  { name: "file", maxCount: 1 }
]);