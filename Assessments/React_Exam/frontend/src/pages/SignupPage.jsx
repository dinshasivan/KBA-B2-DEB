import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import Navebar from '../components/Navebar';


const SignupPage = () => {

    const [fullName, setFullName] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [userRole, setUserRole] = useState('')

    const navigate = useNavigate();

    const SignupForm = async (userDetails)=>{
        const res = await fetch('http://127.0.0.1:3001/signup',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(userDetails),
        });
        if(res.ok){
            navigate('/login')
        }
        else{
            console.log('check input field');
            
        }
    }

    const submithtmlForm = (e)=>{
        e.preventDefault();
        const userDetails ={
            fullName,
            userName,
            password,
            userRole,
        };
        SignupForm(userDetails)
    }

  return (
    <>
    <Navebar/>
    <div className="bg-gray-200 w-2/5 mx-auto mt-10 p-8 rounded-lg shadow-lg">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Sign Up</h1>
            <form onSubmit={submithtmlForm} className="space-y-6">
            <label htmlFor="fullname" className="font-bold">Full Name:</label>
                <input
                    type="text"
                    id="fullname"
                    name="fullname"
                    placeholder="Enter your name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full border border-gray-300 h-12 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
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
                <label htmlFor="userrole" className="font-bold">User Role:</label>
                <select 
                    name="userrole" 
                    id="userrole"
                    value={userRole}
                    onChange={(e)=>setUserRole(e.target.value)}
                    className="w-full border border-gray-300 h-12 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="admin">Admin</option>
                        <option value="user">User</option>

                </select>
                
                <button
                    type="submit"
                    className="w-full h-12 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                   Sign Up
                </button>
                <p>Already have an account ? {' '}<Link to={'/login'}> Login</Link> </p>
            </form>
    </div>
    </>
  )
}

export default SignupPage