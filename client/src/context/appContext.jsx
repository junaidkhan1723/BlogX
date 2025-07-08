/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom'
// context
export const AppContent = createContext();

//context provider
export const AppContextProvider = (props) => {

    axios.defaults.withCredentials = true;

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const navigate = useNavigate();

    const [isLoggedin, setIsLoggedin] = useState(false);
    const [userData, setUserData] = useState(null);
    const [token, setToken] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [input, setInput] = useState('');

    
    // get user authentication 
    const getAuthState = async ()=>{
        try {

            const {data} = await axios.get(backendUrl + '/api/auth/is-auth');

            if(data.success){
                setIsLoggedin(true);
                getUserData();
            }
            
        }  catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
              toast.error(error.response.data.message);
            } else {
              toast.error("Something went wrong");
            }
          }
    }
        // get user logged in data
    const getUserData = async ()=>{
        try {
            const {data} = await axios.get(backendUrl + '/api/user/data')
            data.success ? setUserData(data.userData) : toast.error(data.message);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
              toast.error(error.response.data.message);
            } else {
              toast.error("Something went wrong");
            }
          }
    }

    useEffect(()=>{
        getAuthState();

    },[]);



    //gets blog data

const fetchBlogs = async () => {
  try {
    const { data } = await axios.get(`${backendUrl}/api/blog/all`);
    data.success ? setBlogs(data.blogs) : toast.error(data.message);
  } catch (error) {
    toast.error(error.message);
  }
};

    useEffect(()=>{
        fetchBlogs();
        const token = localStorage.getItem('token')
        if(token){
            setToken(token)
            axios.defaults.headers.common['Authorization'] = `${token}`
        }
    },[])

    const value = {      
        backendUrl,
        isLoggedin, setIsLoggedin,
        userData, setUserData,
        getUserData,blogs, setBlogs,
        input, setInput, navigate,token,
        setToken,axios
    };

    return (
        <AppContent.Provider value={value}>
            {props.children}
        </AppContent.Provider>
    );
};
