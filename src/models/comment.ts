import { ObjectId } from "mongodb";
import IComment from "../interfaces/icomment";
import IUser from "./user";

class Comment implements IComment {
    _id?: string | ObjectId;
    author: string | ObjectId | IUser;
    comment: string;

    constructor(comment: IComment) {
        this._id = comment._id;
        this.author = comment.author;
        this.comment = comment.comment;
    }
}

export default Comment;