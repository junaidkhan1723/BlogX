import express from 'express';
import { adminLogin } from '../controllers/adminController.js';
import { approveCommentById, deleteCommentById, getAllBlogsAdmin, getAllComments, getDashboard } from '../controllers/adminController.js';
import auth from '../middleware/auth.js';


// admin routes
const adminRouter = express.Router();

adminRouter.post("/adminLogin", adminLogin)

//blog routes

adminRouter.get('/comments', auth, getAllComments);
adminRouter.get('/blogs', auth, getAllBlogsAdmin);
adminRouter.post('/delete-comment', auth, deleteCommentById);
adminRouter.post('/approve-comment', auth, approveCommentById);
adminRouter.get('/dashboard', auth, getDashboard);

export default adminRouter;