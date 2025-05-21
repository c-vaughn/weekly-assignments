import React, { useEffect, useState } from 'react';

function GoogleAuthLoader() {
    const[code, setCode] = useState<string | null>(null);

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
            });
            const data = await response.json();
            console.log(data);
        }
    }

    return <div>GoogleAuthLoader</div>;
};

export default GoogleAuthLoader;