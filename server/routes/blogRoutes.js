import express from "express";
import { addBlog, addComment, deleteBlogById, generateContent, getAllBlogs, getBlogById, getBlogComments, togglePublish } from "../controllers/blogControler.js";
import upload from "../middleware/multer.js";

const blogRouter = express.Router();
//blogs routes
blogRouter.post('/add', upload.single('image'), addBlog);
blogRouter.get('/all', getAllBlogs);
blogRouter.post('/add-comment', addComment);
blogRouter.post('/comments', getBlogComments); 

blogRouter.get('/:blogId', getBlogById);
blogRouter.post('/delete', deleteBlogById);
blogRouter.post('/toggle-publish', togglePublish);
blogRouter.post('/generate', generateContent); 


export default blogRouter;