import { Router } from 'express';
import ReviewController from '../controllers/review-controller';
import upload from '../middlewares/multer';

const reviewRouter = Router();

reviewRouter.post('/getById', ReviewController.findById);
reviewRouter.post('/getByOffer', ReviewController.findByOffer);
reviewRouter.get('/getAll', ReviewController.findAll);
reviewRouter.post('/create', upload.array("media"), ReviewController.create);
reviewRouter.post('/comment', ReviewController.comment);
reviewRouter.post('/delete', ReviewController.delete);

export default reviewRouter;