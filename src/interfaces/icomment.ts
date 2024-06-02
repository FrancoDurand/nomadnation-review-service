import { ObjectId } from "mongodb";
import IUser from "./iuser";

interface IComment {
    _id?: string | ObjectId;
    author: string | ObjectId | IUser;
    comment: string;
}

export default IComment;