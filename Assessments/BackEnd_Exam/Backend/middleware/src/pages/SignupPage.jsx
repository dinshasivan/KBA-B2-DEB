import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';


const SignupPage = () => {

    const [fullName, setFullName] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [userRole, setUserRole] = useState('admin')
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
            navigate('/')
        }
        else{
            console.log('check input field');
            
        }
    }

    const submithtmlForm = (e)=>{
        e.prevenDefault();
        const userDetails ={
            fullName,
            userName,
            password,
            userRole,
        };
        SignupForm(userDetails)
    }

  return (
    <div className="bg-purple-100 flex items-center justify-center min-h-screen">
        <div>
            <h1 className="text-3xl font-bold text-purple-700 mb-4 text-center">SignUp</h1>
            <form onSubmit={submithtmlForm}>
                <label htmlFor="fullname">Full Name:</label>
                <input type="text" 
                id='name'
                name='name'
                required
                />

                <label htmlFor="username">User Name:</label>
                <input type="text" 
                id='username'
                name='username'
                required
                />

                <label htmlFor="password"> Password:</label>
                <input type="password" 
                id='password'
                name='password'
                required
                />

                <label htmlFor="uerrole"> User Role:</label>
                <select name="userrole"
                    id="userrole"
                    required>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>

                </select>

            </form>
        </div>
    </div>
  )
}

export default SignupPage