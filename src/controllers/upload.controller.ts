import { Request, Response } from "express";
import { GridFSBucket, MongoClient } from "mongodb";
import upload from "../middleware/upload.middleware";
import { dbConfig, db } from "../configs/db.config";
import { AnyObject } from "mongoose";

const url = dbConfig.url;
const baseUrl = "http://localhost:8000/files/";
const mongoClient = new MongoClient(url);

const uploadFiles = async (req: Request, res: Response) => {
  try {
    await upload(req, res);
    console.log("req.file", req.file);

    if (req.file == undefined) {
      return res.status(500).json({ message: "You must select a file" });
    }

    return res.json({ message: "File has been uploaded" });
  } catch (error) {
    console.log("error", error);

    return res
      .status(500)
      .json({ message: `Error when trying to upload image: ${error}` });
  }
};

const getListFiles = async (req: Request, res: Response) => {
  try {
    const images = db.collection(`${dbConfig.imgBucket}.files`);
    const cursor = images.find();
    // try with cursor.count() maybe
    if ((await images.countDocuments()) === 0) {
      return res.status(500).json({ message: "No files found!" });
    }

    let fileInfos: AnyObject[] = [];
    await cursor.forEach((doc) => {
      fileInfos.push({ name: doc.filename, url: baseUrl + doc.filename });
    });

    return res.json(fileInfos);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

const download = async (req: Request, res: Response) => {
  try {
    const database = mongoClient.db(dbConfig.database);
    console.log("database mongoClient.db(dbConfig.database)", database);
    const bucket = new GridFSBucket(database, {
      bucketName: dbConfig.imgBucket,
    });
    let downloadStream = bucket.openDownloadStreamByName(req.params.name);

    downloadStream.on("data", function (data) {
      return res.status(200).write(data);
    });

    downloadStream.on("error", function (err) {
      return res.status(404).json({ message: "Cannot download the Image!" });
    });

    downloadStream.on("end", function () {
      return res.end();
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export default { uploadFiles, download, getListFiles };
