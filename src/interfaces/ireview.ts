import { ObjectId } from "mongodb";
import IMedia from "./imedia";
import IComment from "./icomment";
import IUser from "./iuser";

interface IReview {
    _id?: string | ObjectId;
    offer: string | ObjectId;
    author: string | ObjectId | IUser;
    title: string;
    media: IMedia[];
    post: string;
    comments: IComment[];
}

export default IReview;