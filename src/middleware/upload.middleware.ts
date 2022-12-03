import util from "util";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import { dbConfig } from "../configs/db.config";

const storage = new GridFsStorage({
  url: dbConfig.url,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimeType) === -1) {
      const filename = `${Date.now()}-odinbook-${file.originalName}`;
      return filename;
    }

    return {
      bucketName: dbConfig.imgBucket,
      filename: `${Date.now()}-odinbook-${file.originalName}`,
    };
  },
});

const uploadFiles = multer({ storage }).single("file");
const uploadFilesMiddleware = util.promisify(uploadFiles);

export default uploadFilesMiddleware;
