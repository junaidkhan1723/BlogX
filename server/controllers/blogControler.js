import fs from 'fs';
import imagekit from '../config/imageKit.js';
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';
import main from '../config/gemini.js';

export const addBlog = async (req, res)=>{

    try {
        const {title,authorName, subTitle, description, category, isPublished} = JSON.parse(req.body.blog);
        const imageFile = req.file;

        //check if all feilds are present

        if(!title || !description || !category || !imageFile){
            return res.json({success: false, message: "Missing required fields"})
        }
    // ✅ Read file buffer from disk
    const fileBuffer = fs.readFileSync(imageFile.path);

    // ✅ Upload to ImageKit
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    // ✅ Get optimized URL
    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: "1280" },
      ],
    });

    // ✅ Save blog
    await Blog.create({
      title,
      authorName,
      subTitle,
      description,
      category,
      isPublished,
      image: optimizedImageUrl,
    });

    res.json({ success: true, message: "Blog added successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// get All blog data 
export const getAllBlogs = async (req, res)=>{
    try {
        const blogs = await Blog.find({isPublished: true})
        res.json({success: true, blogs})

    } catch (error) {
         res.json({success: false, message: error.message})
       
    }
};
// get single blog data
export const getBlogById = async (req, res)=>{
    try {
        const {blogId} = req.params;
        const blog = await Blog.findById(blogId)

        if(!blog){
            return res.json({success: false, message: "Blog not found"})
        }
        res.json({success: true, blog})

    } catch (error) {
         res.json({success: false, message: error.message})
       
    }
};

 

// delete blog (admin protected)
export const deleteBlogById = async (req, res) => {
  try {
    const { id, adminPassword } = req.body;

    // ✅ Step 1: Check admin password
    if (!adminPassword || adminPassword !== process.env.ADMIN_PASSWORD1) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid Admin Password",
      });
    }

    // ✅ Step 2: Delete blog and related comments
    await Blog.findByIdAndDelete(id);
    await Comment.deleteMany({ blog: id });

    res.json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


//pusbish or unpublish toggle

export const togglePublish = async (req, res)=>{
    try {
        const {id} = req.body;
        const blog = await Blog.findById(id)
        blog.isPublished = !blog.isPublished;
        await blog.save();
        res.json({success: true, message: 'Blog stutus updated'})

    } catch (error) {
         res.json({success: false, message: error.message})
       
    }
};

// comment 
export const addComment = async (req, res)=>{
    try {
        const {blog, name, content} = req.body;
        await Comment.create({blog, name, content})
             res.json({success: true, message: 'Comment added for review'})

    } catch (error) {
         res.json({success: false, message: error.message})
        
    }
};

// show comments

export const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.body;

    const comments = await Comment.find({ blog: blogId, isApproved: true })
      .sort({ createdAt: -1 });

    res.json({ success: true, comments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Ai content generation

export const generateContent = async (req, res)=>{
  try {
    const {prompt} = req.body
    const content = await main(prompt + 'Generate a proper industry level complete blog for this topic in simple text format.')
    res.json({success: true, content})
  } catch (error) {
        res.json({success: false, message: error.message})

  }
}