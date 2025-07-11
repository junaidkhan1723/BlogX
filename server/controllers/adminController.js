import Blog from '../models/Blog.js';
import Comment from "../models/Comment.js";
import jwt from 'jsonwebtoken'


export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
      return res.json({ success: false, message: 'Invalid Credentials' });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ success: true, token });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
//all blogs
export const getAllBlogsAdmin = async (req, res)=>{
    try {
        const blogs = await Blog.find({}).sort({createdAt: -1});
        res.json({success: true, blogs})
    } catch (error) {
         res.json({ success: false, message: error.message})
       
    }
};

// all comments

export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({})
      .populate({
        path: 'blog',           // ✅ correct field name
        select: 'title',        // optional: only get blog title
        options: { strictPopulate: false } // optional but helps avoid future errors
      })
      .sort({ createdAt: -1 });

    res.json({ success: true, comments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// dashboard data
export const getDashboard = async (req, res)=>{
    try {
        const recentBlogs = await Blog.find({}).sort({createdAt: -1}).limit(5);
        const blogs = await Blog.countDocuments();
        const comments = await Comment.countDocuments();
        const drafts = await Blog.countDocuments({isPublished: false});

        const dashboardData = {
            blogs, comments, drafts, recentBlogs
        }
        res.json({success: true, dashboardData})

    } catch (error) {
          res.json({ success: false, message: error.message})
       
    }
};

// delete comment

export const deleteCommentById = async (req, res) => {
  try {
    const { id, adminPassword } = req.body;

    // Check admin password
    if (!adminPassword || adminPassword !== process.env.ADMIN_PASSWORD1) {
      return res.status(401).json({ success: false, message: "Unauthorized: Invalid Admin Password" });
    }

    // Delete the comment
    await Comment.findByIdAndDelete(id);
    res.json({ success: true, message: "Comment deleted successfully" });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};



// comment approvel

export const approveCommentById = async (req, res)=>{
    try {
        const {id} = req.body;
        await Comment.findByIdAndUpdate(id, {isApproved: true});
        res.json({success: true, message: 'Comment approved successfully'})
    } catch (error) {
          res.json({ success: false, message: error.message})
        
    }
};


