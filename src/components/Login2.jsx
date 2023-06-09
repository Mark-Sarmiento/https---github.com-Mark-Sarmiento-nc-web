import React,{useEffect} from "react";
import loginImg from "../assets/login.jpg";
import {GoogleButton} from "react-google-button";
import { UserAuth } from '../context/AuthContext';
import {useNavigate} from 'react-router-dom';
{/*import {FaFacebook} from "react-icons/fa"*/}

export default function Login2(){
    
    const {googleSignIn,user} = UserAuth();
    const navigate = useNavigate();

    const handleGoogleSignIn =async ()=>{
        try{
            await googleSignIn();
        } catch (error){
            console.log(error);
        }
    };

    useEffect(() => {
        if(user != null){
            navigate("/")
        }
    }, [])
    return(
        <div className="relative w-full h-screen bg-zinc-900/90">
            <img className="absolute w-full h-full object-cover mix-blend-overlay" src={loginImg} alt="/"/>
        
        <div>
            <form className="max-w-[400px] w-full mx-auto bg-white p-8">
                <h2 className="text-4xl font-bold text-center py-8">NutriCulture</h2>
                <div className="flex items-center px-10 py-2 relative">
                    {/*<p className="border shadow-lg hover:shadow-xl px-6 py-2 relative flex items-center"> <FaFacebook className="mr-2"/> Facebook</p>*/}
                    <GoogleButton className="mr-2" onClick={handleGoogleSignIn}/>
                </div >
                <div className="flex flex-col mb-4">
                    <label className="text-black">Username</label>
                    <input className="border relative bg-gray-100 py-2" type="text"/>
                </div>
                <div className="flex flex-col ">
                    <label className="text-black">Password</label>
                    <input className="border relative bg-gray-100 py-2" type="password"/>
                </div>
                <button className="w-full py-3 mt-8 bg-indigo-600 hover:bg-indigo-500 relative text-white">Sign In</button>
                <p className="flex items-center mt-2"><input className="mr-2" type="checkbox"/>Remember me </p>
                <p className="text-cent mt-8">Create Account</p>
            </form>
        </div>

        </div>
    )
}