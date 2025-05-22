import React, { useEffect, useState } from 'react';
import { data, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';
function GoogleAuthLoader() {
    const[code, setCode] = useState<string | null>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        setCode(urlParams.get('code') || null);
    }, []);

    useEffect(() => {
        handleGoogleAuth(code);
    }, [code]);

    async function handleGoogleAuth(code: string | null) {
        if (code) {
            const response = await fetch(`http://localhost:3000/oauth?code=${code}`, {
                method: 'GET',
                credentials: 'include',
            });
            const data = await response.json();
            console.log(data);
            handleUser(data.user.email);
        }
    }

    async function handleUser(email: string) {
        console.log('email', email);
        const response = await fetch('http://localhost:3000/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
            credentials: 'include',
        });
        const user = await response.json();
        console.log(user);
        dispatch(setUser(user));
        navigate('/dashboard');
    }

    return <div>GoogleAuthLoader</div>;
};

export default GoogleAuthLoader;