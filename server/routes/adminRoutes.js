import express from 'express';
import { adminLogin } from '../controllers/adminController.js';
import { approveCommentById, deleteCommentById, getAllBlogsAdmin, getAllComments, getDashboard } from '../controllers/adminController.js';



// admin routes
const adminRouter = express.Router();

adminRouter.post("/adminLogin", adminLogin)

//blog routes

adminRouter.get('/comments', getAllComments);
adminRouter.get('/blogs', getAllBlogsAdmin);
adminRouter.post('/delete-comment', deleteCommentById);
adminRouter.post('/approve-comment', approveCommentById);
adminRouter.get('/dashboard', getDashboard);

export default adminRouter;