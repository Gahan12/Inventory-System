import { Link } from "react-router-dom/cjs/react-router-dom.min";
import background from "../Assets/backgroundi.png"

import { useState } from 'react';

function Signup(props) {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validateForm();
        if (isValid) {
            if (role == 'Customer') {
                try {
                    const response = await fetch("http://localhost:5000/signUp", {
                        method: "POST",
                        body: JSON.stringify({
                            'name': username,
                            'email': email,
                            'password': password,
                            'role': role
                        }),
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });
                
                    if (response.ok) {
                        setMessage('Signup successful. Please check your email.');
                    } else {
                        setMessage('Email already exist.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            }
            else {
                try {
                    const response = await fetch("http://localhost:5000/adminRequest", {
                        method: "POST",
                        body: JSON.stringify({
                            'name': username,
                            'email': email,
                            'password': password,
                            'role': role
                        }),
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });
                
                    if (response.ok) {
                        setMessage('Signup successful. Please check your email.');
                    } else {
                        setMessage('Email already exist.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        }
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {};

        if (!email) {
            newErrors.email = 'Email is required';
            valid = false;
        }

        if (!username) {
            newErrors.username = 'Username is required';
            valid = false;
        }

        if (!password) {
            newErrors.password = 'Password is required';
            valid = false;
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
            valid = false;
        }

        if (!role) {
            newErrors.role = 'Role is required';
            valid = false;
        }

        if (role != 'Customer' && role != 'Admin') {
            newErrors.role = 'Invalid Role';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    return (
        <>
        
            <div className="flex justify-around flex-col sm:flex sm:flex-row">
                <div className=" p-2 ">
                    <img className="h-full " src={background} alt="Inventory Logo"></img>
                </div>
                <div className="w-3/4 h-screen flex flex-col items-center justify-center">
                    <div className="p-2 text-xl text-slate-800 font-medium">
                        SIGN UP, It's Free!
                    </div>
                    <form className="flex flex-col w-3/4 h-3/4 items-center justify-around" onSubmit={handleSubmit}>
                        <input type="text" className="placeholder:non-italic placeholder:text-slate-400 block bg-white w-full border rounded-md border-gray-700 h-1/7  py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-gray-700 focus:ring-gray-700 focus:ring-1 sm:text-sm" placeholder="Username" onChange={(e) => setUsername(e.target.value)}></input>
                        {errors.username && <div className="text-red-500">{errors.username}</div>}
                        <input type="email" className="placeholder:non-italic placeholder:text-slate-400 block bg-white w-full border rounded-md border-gray-700 h-1/7  py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-gray-700 focus:ring-gray-700 focus:ring-1 sm:text-sm" placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
                        {errors.email && <div className="text-red-500">{errors.email}</div>}
                        <input type="text" className="placeholder:non-italic placeholder:text-slate-400 block bg-white w-full border rounded-md border-gray-700 h-1/7  py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-gray-700 focus:ring-gray-700 focus:ring-1 sm:text-sm" placeholder="Role (Admin or Customer)" onChange={(e) => setRole(e.target.value)}></input>
                        {errors.role && <div className="text-red-500">{errors.role}</div>}
                        <input type="password" className="placeholder:non-italic placeholder:text-slate-400 block bg-white w-full border rounded-md border-gray-700 h-1/7  py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-gray-700 focus:ring-gray-700 focus:ring-1 sm:text-sm" placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
                        {errors.password && <div className="text-red-500">{errors.password}</div>}
                        <input type="password" className="placeholder:non-italic placeholder:text-slate-400 block bg-white w-full border rounded-md border-gray-700 h-1/7  py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-gray-700 focus:ring-gray-700 focus:ring-1 sm:text-sm" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)}></input>
                        {errors.confirmPassword && <div className="text-red-500">{errors.confirmPassword}</div>}
                        <button className=" text-slate-200 text-md bg-slate-800 w-1/3 rounded-md h-12 ">SIGN UP</button>
                    </form>

                    {message && <div>
                        {message}
                        <Link className="font-medium" to = "/signin">Log In</Link>
                    </div>}
                </div>
            </div>
        </>
    );
}

export default Signup;

