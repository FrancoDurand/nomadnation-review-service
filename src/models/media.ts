import { ObjectId } from "mongodb";
import IMedia from "../interfaces/imedia";

class Media implements IMedia {
    _id?: string | ObjectId;
    route: string;

    constructor(media: IMedia) {
        this._id = media._id;
        this.route = media.route;
    }
}

export default Media;