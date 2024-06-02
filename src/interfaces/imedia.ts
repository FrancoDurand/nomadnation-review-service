import { ObjectId } from "mongodb";

interface IMedia {
    _id?: string | ObjectId;
    route: string;
}

export default IMedia;