import React, { useEffect, useRef, useState } from 'react'
import { assets, blogCategories } from '../../assets/assets'
import Quill from 'quill';

const AddBlog = () => {

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [image, setImage] = useState(false);
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [category, setCategory] = useState('Startup');
  const [isPublished, setIsPublished] = useState(false);

  const generateContent = async ()=>{
    
  }

  const onSubmitHandler = async (e)=>{
    e.preventDefault();
  };

  useEffect(()=>{
    //Initiate Quill only once
    if(!quillRef.current && editorRef.current){
      quillRef.current = new Quill(editorRef.current, {theme: 'snow'})
    }
  }, [])
  return (
    <>
      <form onSubmit={onSubmitHandler} className='flex bg-blue-50/50 text-gray-600 h-full overflow-scroll'>

          {/** Image Thumbnail */} 

        <div className="bg-white w-full max-w-4xl md:p-10 p-4 sm:m-10 shadow-lg rounded">
          <p>Upload thumbnail</p>
          <label htmlFor="image">
            <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" className='mt-2 h-16 rounded cursor-pointer' />
            <input onChange={(e)=> setImage(e.target.files[0])} type="file" id='image' hidden required/>
          </label>

          {/** Title */}
          <p className='mt-4'>Blog title</p>
          <input type="text" placeholder='Type here...' required className='w-full max-w-lg mt-2 border border-gray-300 outline-none rounded'
          onChange={(e)=> setTitle(e.target.value)} value={title}/>

          {/** SubTitle */}

          <p className='mt-4'>Sub title</p>
          <input type="text" placeholder='Type here...' required className='w-full max-w-lg mt-2 border border-gray-300 outline-none rounded'
          onChange={(e)=> setSubTitle(e.target.value)} value={subTitle}/>

          <p className='mt-4'>Blog Description</p>
          <div className='max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative'>
            <div ref={editorRef}></div>

            {/** Button */}
            <button type='button' onClick={generateContent} className='absolute bottom-1 right-2 ml-2 text-xs text-indigo-800
            border-primary/40 bg-primary/20 rounded px-4 py-1.5 hover:underline cursor-pointer animate-bounceX hover:animate-wiggleX hover:text-purple-900 transition duration-300'>Generate with AI <i className="bi bi-stars"></i></button>
          </div>
          <p className='mt-4'>Blog category</p>
            <select onChange={(e)=> setCategory(e.target.value)} name="category" className='mt-2 px-3 border text-gray-500 border-gray-300 outline-none rounded'>
              <option value="">Select category</option>
              {blogCategories.map((item, index)=>{
                return <option key={index} value={item}>{item}</option>
              })}
            </select>

            <div className='flex gap-2 mt-4'>
              <p>Publish Now</p>
              <input type="checkbox" checked={isPublished} className='scale-125 cursor-pointer' onChange={(e)=> setIsPublished(e.target.checked)} />
            </div>

            <button type='submit' className='mt-8 w-40 h-10 bg-primary text-white
            rounded cursor-pointer text-sm'>Add Blog</button>
        </div>
      </form>
    </>
  )
}

export default AddBlog
