import background from "../Assets/ims2-modified.jpg"

import { useState } from 'react';

function Signin(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/signIn', {
                method: 'POST',
                body: JSON.stringify({
                    'email': username,
                    'password': password
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.ok) {
                const result = await response.json();
                props.setData(result);
                window.location.pathname = '/dashboard';
            } else {
                alert('Invalid Credentials');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <div className="h-screen w-full bg-slate-200 flex justify-center items-center" style={{ backgroundImage: `url(${background})` }}>
                <form className="flex bg-zinc-950 opacity-90 rounded-md flex-col justify-around items-center shadow-md h-3/4 py-6  px-5 w-1/3" onSubmit={handleSubmit}>
                    <div className=" text-xl text-white font-medium">
                            GET LOGGED IN!
                    </div>
                    <input type="text" className="placeholder:non-italic placeholder:text-slate-400 block bg-white w-full border rounded-md border-gray-700 h-1/6  py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-gray-700 focus:ring-gray-700 focus:ring-1 sm:text-sm" placeholder="Email" onChange={(e) => setUsername(e.target.value)}></input>
                    <input type="password" className="placeholder:non-italic placeholder:text-slate-400 block bg-white w-full border rounded-md border-gray-700 h-1/6  py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-gray-700 focus:ring-gray-700 focus:ring-1 sm:text-sm" placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>  
                    <button className=" text-slate-900 text-md bg-slate-200 w-1/3 rounded-md h-12" type="submit">SIGN IN</button>
                </form>
            </div>
        </>
    );
}

export default Signin;
