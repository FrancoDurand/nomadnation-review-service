import { Request, Response } from 'express';
import IReview from '../interfaces/ireview';
import ReviewRepository from '../repositories/review-repository';

class ReviewController {
    static repository = new ReviewRepository;

    public static async findById(req: Request, res: Response): Promise<void> {
        try {
            const review: IReview = req.body;

            if (!review._id) {
                res.status(400).json({ message: 'Invalid review data' });
                return;
            }

            const result = await ReviewController.repository.findById(review);
            res.status(200).json(result);
        }
        catch (e) {
            res.status(500).json({ message: 'Internal server error', error: e });
        }
    }

    public static async findByOffer(req: Request, res: Response): Promise<void> {
        try {
            const review: IReview = req.body;

            if (!review.offer) {
                res.status(400).json({ message: 'Invalid review data' });
                return;
            }

            const result = await ReviewController.repository.findByOffer(review);
            res.status(200).json(result);
        }
        catch (e) {
            res.status(500).json({ message: 'Internal server error', error: e });
        }
    }

    public static async findAll(req: Request, res: Response): Promise<void> {
        try {
            const result = await ReviewController.repository.findAll();
            res.status(200).json(result);
        }
        catch (e) {
            res.status(500).json({ message: 'Internal server error', error: e });
        }
    }

    public static async create(req: Request, res: Response): Promise<void> {
        try {
            if (!req.files) {
                res.status(400).json({ message: 'No media' })
                return;
            }

            const review: IReview = req.body;

            req.body.media = req.body.mediaData;
            delete req.body.mediaData;
            req.body.comments = []

            if (!review.offer || !review.author || !review.title || !review.post) {
                res.status(400).json({ message: 'Invalid review data' });
                return;
            }
            const result = await ReviewController.repository.create(review);

            if (result)
                res.status(200).json(result);
            else
                res.status(400).json({ message: 'Review not created' });
        }
        catch (e) {
            res.status(500).json({ message: 'Internal server error', error: e });
        }
    }

    /*
        public static async update(req: Request, res: Response): Promise<void> {
            try {
                const user: IUser = req.body;
    
                if (!user._id) {
                    res.status(400).json({ message: 'Invalid user data' });
                    return;
                }
    
                const result = await ReviewController.repository.update(user);
    
                if (result) {
                    res.status(200).json({ message: "User updated", offer: user });
                }
                else
                    res.status(400).json({ message: "User not updated" });
            }
            catch (e) {
                res.status(500).json({ message: 'Internal server error', error: e });
            }
        }
    */

    public static async comment(req: Request, res: Response): Promise<void> {
        try {
            const review: IReview = req.body;

            if (!review._id || !review.comments) {
                res.status(400).json({ message: 'Invalid review data' });
                return;
            }

            const result = await ReviewController.repository.comment(review);

            if (result) {
                res.status(200).json({ message: "Comment added", review: review });
            }
            else
                res.status(400).json({ message: "Comment not added" });
        }
        catch (e) {
            res.status(500).json({ message: 'Internal server error', error: e });
        }
    }

    public static async delete(req: Request, res: Response): Promise<void> {
        try {
            const review: IReview = req.body;

            if (!review._id) {
                res.status(400).json({ message: 'Invalid review data' });
                return;
            }

            const result = await ReviewController.repository.delete(review);

            if (result) {
                res.status(200).json({ message: "Review deleted" });
            }
            else
                res.status(400).json({ message: "Review not deleted" });
        }
        catch (e) {
            res.status(500).json({ message: 'Internal server error', error: e });
        }
    }
}

export default ReviewController;


