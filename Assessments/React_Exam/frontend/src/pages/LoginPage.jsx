import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navebar from '../components/Navebar';

const LoginPage = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

    const loginSubmit = async (e)=>{
        e.preventDefault();

        const logingDetails ={
            userName,
            password
        };

        const res = await fetch('http://127.0.0.1:3001/login',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(logingDetails),
        });

        console.log(logingDetails);

        if(res.ok){
            const data = await res.json();
            navigate('/')
        }else{
            console.log('check your details');
            
        }
        
    }

  return (
    <>
    <Navebar/>
    <div className="bg-gray-200 w-2/5 mx-auto mt-10 p-8 rounded-lg shadow-lg">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Login</h1>
            <form onSubmit={loginSubmit} className="space-y-6">
                <label htmlFor="username" className="font-bold">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                    className="w-full border border-gray-300 h-12 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <label htmlFor="password" className="font-bold">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full border border-gray-300 h-12 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                
                <button
                    type="submit"
                    className="w-full h-12 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                   Login
                </button>
                <p>Don't have an account ? {' '}<Link to={'/signup'}> Signup</Link> </p>
            </form>
    </div>
    </>
  )
}

export default LoginPage