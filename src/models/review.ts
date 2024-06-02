import { ObjectId } from "mongodb";
import IReview from "../interfaces/ireview";
import IComment from "../interfaces/icomment";
import IMedia from "../interfaces/imedia";
import IUser from "./user";

class Review implements IReview {
    _id?: string | ObjectId;
    offer: string | ObjectId;
    author: string | ObjectId | IUser;
    title: string;
    media: IMedia[];
    post: string;
    comments: IComment[];

    constructor(review: IReview) {
        this._id = review._id;
        this.offer = review.offer;
        this.author = review.author;
        this.title = review.title;
        this.media = review.media;
        this.post = review.post;
        this.comments = review.comments;
    }
}

export default Review;