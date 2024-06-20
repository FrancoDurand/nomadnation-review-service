import { ObjectId } from "mongodb";
import IRepository from "../interfaces/irepository";
import IReview from "../interfaces/ireview";
import IUser from "../interfaces/iuser";
import Database from "../services/database";

class ReviewRepository implements IRepository<IReview> {
    collection_reviews = "reviews"
    collection_users = "users"

    async create(entity: IReview): Promise<IReview> {
        const db = await Database.connect();
        const reviews = await db.collection<IReview>(this.collection_reviews);

        entity.offer = new ObjectId(entity.offer as string);
        entity.author = new ObjectId(entity.author as string);

        await reviews.insertOne(entity);
        await Database.disconnect();
        return entity;
    }

    async update(entity: Partial<IReview>): Promise<IReview | null> {
        const db = await Database.connect();
        const reviews = await db.collection<IReview>(this.collection_reviews);
        const _id = new ObjectId(entity._id);
        delete entity._id;

        const result = await reviews.findOneAndUpdate(
            { _id },
            { $set: entity },
            { returnDocument: "after" }
        );

        await Database.disconnect();
        return result;
    }

    async comment(entity: Partial<IReview>): Promise<IReview | null> {
        const db = await Database.connect();
        const reviews = await db.collection<IReview>(this.collection_reviews);

        if (!entity.comments)
            return null;

        const newComment = entity.comments[0];

        newComment._id = new ObjectId;
        newComment.author = new ObjectId(newComment.author as string);

        const result = await reviews.findOneAndUpdate(
            { _id: new ObjectId(entity._id as string) },
            { $push: { comments: newComment } },
            { returnDocument: "after" }
        );

        await Database.disconnect();
        return result;
    }

    async delete(entity: IReview): Promise<boolean> {
        const db = await Database.connect();
        const reviews = await db.collection<IReview>(this.collection_reviews);
        const result = await reviews.deleteOne(
            { _id: new ObjectId(entity._id) },
        );

        await Database.disconnect();
        return result.deletedCount ? true : false;
    }

    async findById(entity: IReview): Promise<IReview | null> {
        const db = await Database.connect();
        const reviews = await db.collection<IReview>(this.collection_reviews);
        const reviewData = await reviews.findOne({ _id: new ObjectId(entity._id) });

        if (!reviewData)
            return null;

        const authorData = await this.joinAuthorData(reviewData.author as ObjectId);

        if (authorData)
            reviewData.author = authorData;

        if (reviewData.comments) {
            for (let i = 0; i < reviewData.comments.length; i++) {
                const comment = reviewData.comments[i];
                const authorData = await this.joinAuthorData(comment.author as ObjectId);

                if (authorData)
                    comment.author = authorData;
            }
        }

        await Database.disconnect();
        return reviewData;
    }

    async findByOffer(entity: IReview): Promise<IReview[] | null> {
        const db = await Database.connect();
        const reviews = await db.collection<IReview>(this.collection_reviews);
        const reviewsData = await reviews.find({ offer: new ObjectId(entity.offer) }).toArray();

        if (!reviewsData)
            return null;

        for (let i = 0; i < reviewsData.length; i++) {
            const review = reviewsData[i];
            const authorData = await this.joinAuthorData(review.author as ObjectId);

            if (authorData)
                review.author = authorData;

            if (review.comments) {
                for (let j = 0; j < review.comments.length; j++) {
                    const comment = review.comments[j];
                    const authorData = await this.joinAuthorData(comment.author as ObjectId);

                    if (authorData)
                        comment.author = authorData;
                }
            }
        }

        await Database.disconnect();
        return reviewsData;
    }

    async findAll(): Promise<IReview[]> {
        const db = await Database.connect();
        const reviews = await db.collection<IReview>(this.collection_reviews);

        const reviewsData: IReview[] = await reviews.find().toArray();

        if (!reviewsData)
            return [];

        for (let i = 0; i < reviewsData.length; i++) {
            const review = reviewsData[i];
            const authorData = await this.joinAuthorData(review.author as ObjectId);

            if (authorData)
                review.author = authorData;

            if (review.comments) {
                for (let j = 0; j < review.comments.length; j++) {
                    const comment = review.comments[j];
                    const authorData = await this.joinAuthorData(comment.author as ObjectId);

                    if (authorData)
                        comment.author = authorData;
                }
            }
        }

        await Database.disconnect();
        return reviewsData;
    }

    private async joinAuthorData(userId: ObjectId): Promise<IUser | null> {
        const db = await Database.connect();
        const users = await db.collection<IUser>(this.collection_users);

        const authorData = await users.findOne(
            { _id: userId },
            {
                projection:
                {
                    name: 1,
                    profilePic: 1
                }
            });

        await Database.disconnect();
        return authorData;
    }
}

export default ReviewRepository;
