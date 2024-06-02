import { ObjectId } from "mongodb";

interface IUser {
    _id?: string | ObjectId;
    name: string;
    profilePic: string;
}

export default IUser;