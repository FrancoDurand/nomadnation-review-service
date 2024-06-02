import multer from "multer";
import { Request } from "express";
import fs from "fs";
import path from "path";
import { ObjectId } from "mongodb";
import IMedia from "../interfaces/imedia";

const mediaDir = path.join(__dirname, "../../media");

if (!fs.existsSync(mediaDir))
    fs.mkdirSync(mediaDir)

const storage = multer.diskStorage({
    destination: (req: Request, file, cb) => {
        cb(null, mediaDir);
    },
    filename: (req: Request, file, cb) => {
        /* req.body.media ->[] 
            _id->
            route->
        */
        const mediaId = new ObjectId;

        const extension = path.extname(file.originalname);
        const fileName = mediaId.toString() + extension;

        const media: IMedia = {
            _id: mediaId,
            route: `/media/${fileName}`
        }

        if (!req.body.mediaData)
            req.body.mediaData = []

        const mediaData: IMedia[] = req.body.mediaData;
        mediaData.push(media);

        req.body.mediaData = mediaData;

        cb(null, fileName);
    }
});
const upload = multer({ storage: storage });

export default upload;